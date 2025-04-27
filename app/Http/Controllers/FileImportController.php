<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class FileImportController extends Controller
{
    public function admin(){
        $tables = DB::select('SHOW TABLES');
        $key = 'Tables_in_' . env('DB_DATABASE');
        $tableNames = collect($tables)->pluck($key)->toArray();
        return Inertia::render('Admin/Import', ['tableNames' => $tableNames]);
    }

    public function import(Request $request)
    {
        $request->validate([
            'table_name' => 'required|string',
            'csv_file' => 'required|file|mimes:csv,txt',
            'has_header' => 'nullable|boolean',
        ]);

        $file = fopen($request->file('csv_file')->getRealPath(), 'r');

        $hasHeader = $request->boolean('has_header');

        $columns = $hasHeader ? fgetcsv($file) : ['name', 'email', 'age']; // change this based on expected structure

        $data = [];
        while (($row = fgetcsv($file)) !== false) {
            $data[] = array_combine($columns, $row);
        }

        fclose($file);

        // Now insert into DB (example: bulk insert)
        DB::table('table_name')->insert($data);

        return back()->with('success', 'CSV uploaded successfully.');
    }
}
