<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FileImportController extends Controller
{
    public function admin()
    {
        $database = config('database.connections.mysql.database');
        $excludedTables = [
            'admins', 'cache', 'cache_locks', 'failed_jobs', 
            'jobs', 'job_batches', 'migrations', 
            'password_reset_tokens', 'sessions', 'users'
        ];
        
        // Convert to comma-separated quoted strings for SQL
        $excludedTablesString = collect($excludedTables)
            ->map(fn($table) => "'$table'")
            ->implode(',');
        
        // Get all non-excluded tables with their columns and data types
        $columnsInfo = DB::select("
        SELECT 
            TABLE_NAME as table_name, 
            COLUMN_NAME as column_name, 
            COLUMN_TYPE as column_type,
            IS_NULLABLE as is_nullable,
            COLUMN_KEY as column_key,
            EXTRA as extra
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = '{$database}'
        AND TABLE_NAME NOT IN ({$excludedTablesString})
        ORDER BY TABLE_NAME, ORDINAL_POSITION
        ");

        // Organize the data with type information
        $tableColumns = [];
        foreach ($columnsInfo as $info) {
            $tableColumns[$info->table_name][] = [
                'name' => $info->column_name,
                'type' => $info->column_type,
                'nullable' => $info->is_nullable === 'YES',
                'key' => $info->column_key,
                'extra' => $info->extra
            ];
        }
        
        $tableNames = array_keys($tableColumns);
        
        return Inertia::render('Admin/Import', [
            'tableNames' => $tableNames,
            'tableColumns' => $tableColumns
        ]);
    }

    public function import(Request $request)
    {
        $request->validate([
            'table_name' => 'required|string',
            'csv_file' => [
                'required',
                'file',
                'mimetypes:text/csv,text/plain,text/x-csv,application/csv,application/vnd.ms-excel',
                'mimes:csv,txt',
                'max:5120' // 5MB
            ],
            'has_header' => 'nullable|boolean',
        ]);

        $file = $request->file('csv_file');
        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, ['csv', 'txt'])) {
            return back()->with('error', 'Invalid file extension. Only CSV or TXT files are allowed.');
        }

        $tableName = $request->input('table_name');
        $tableColumns = Schema::getColumnListing($tableName);
        $autoIncrementColumn = $this->getAutoIncrementColumn($tableName);

        // Remove auto-increment column from required validation
        $requiredColumns = array_diff($tableColumns, [$autoIncrementColumn]);

        $fileHandle = fopen($file->getRealPath(), 'r');

        try {
            $hasHeader = $request->boolean('has_header');
            $csvColumns = $hasHeader ? fgetcsv($fileHandle) : $requiredColumns;
            $lineNumber = $hasHeader ? 1 : 0;

            // Validate against required columns (excluding auto-increment)
            $this->validateCsvColumns($csvColumns, $requiredColumns, $tableName);

            $data = [];
            
            $expectedColumnCount = count($csvColumns);
            
            while (($row = fgetcsv($fileHandle)) !== false) {
                $lineNumber++;
                
                if (empty(array_filter($row))) {
                    continue;
                }

                if (count($row) !== $expectedColumnCount) {
                    throw new \Exception("Column count mismatch. Expected {$expectedColumnCount} columns, found " . count($row));
                }

                try {
                    $rowData = array_combine($csvColumns, $row);
                    
                    // Auto-increment column will be automatically handled by database
                    $preparedData = $this->prepareRowData($rowData, $tableName, $autoIncrementColumn);
                    
                    $data[] = $preparedData;

                    if (count($data) >= 100) {
                        DB::table($tableName)->insert($data);
                        $data = [];
                    }
                } catch (\Exception $e) {
                    throw new \Exception("Line {$lineNumber}: " . $e->getMessage());
                }
            }

            if (!empty($data)) {
                DB::table($tableName)->insert($data);
            }

            fclose($fileHandle);
            return back()->with('success', "CSV imported successfully into $tableName table ($lineNumber records processed)");

        } catch (\Exception $e) {
            if (isset($fileHandle)) {
                fclose($fileHandle);
            }
            return back()->with('error', "Error on line $lineNumber: " . $e->getMessage());
        }
    }

    protected function getAutoIncrementColumn($tableName)
    {
        return DB::select("
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? 
            AND TABLE_NAME = ? 
            AND EXTRA LIKE '%auto_increment%'
        ", [env('DB_DATABASE'), $tableName])[0]->COLUMN_NAME ?? null;
    }

    protected function validateCsvColumns($csvColumns, $tableColumns, $tableName)
    {
        $requiredColumns = array_diff($tableColumns, [$this->getAutoIncrementColumn($tableName)]);
        
        $missingColumns = array_diff($requiredColumns, $csvColumns);
        if (!empty($missingColumns)) {
            throw new \Exception("Missing columns: " . implode(', ', $missingColumns));
        }

        $extraColumns = array_diff($csvColumns, $tableColumns);
        if (!empty($extraColumns)) {
            throw new \Exception("Extra columns not in table: " . implode(', ', $extraColumns));
        }
    }

    protected function prepareRowData($rowData, $tableName, $autoIncrementColumn)
    {
        // Remove auto-increment column if present
        if ($autoIncrementColumn && array_key_exists($autoIncrementColumn, $rowData)) {
            unset($rowData[$autoIncrementColumn]);
        }

        // Convert empty strings to NULL for nullable columns
        $nullableColumns = $this->getNullableColumns($tableName);
        foreach ($rowData as $column => &$value) {
            if (in_array($column, $nullableColumns) && $value === '') {
                $value = null;
            }
        }

        // Add timestamps if columns exist
        if (Schema::hasColumn($tableName, 'created_at')) {
            $rowData['created_at'] = now();
        }
        if (Schema::hasColumn($tableName, 'updated_at')) {
            $rowData['updated_at'] = now();
        }

        return $rowData;
    }

    protected function getNullableColumns($tableName)
    {
        return collect(DB::select("
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? 
            AND TABLE_NAME = ? 
            AND IS_NULLABLE = 'YES'
        ", [env('DB_DATABASE'), $tableName]))->pluck('COLUMN_NAME')->toArray();
    }
}
