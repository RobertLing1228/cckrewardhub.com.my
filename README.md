After setting up the repository on your local files, open the **folder** in Visual Code. You will need to use the terminal for installs and commands.

Make sure you have Composer and Node.js installed.

<h2>Setup</h2>
In the terminal in visual code
<p>
  1. composer install
  - Use Composer to install the PHP dependencies:
  
  
  2. npm install
  - Install the required JavaScript packages:
  
  3. cp .env.example .env
  - Copy the .env.example file to .env:
  
  4. Create a new database using phpmyadmin or however you like.
  
  5. Edit the .env file to configure your database and other settings:
  <p>DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=your_database_name
  DB_USERNAME=your_database_user
  DB_PASSWORD=your_database_password
  </p>
  
  
  6. php artisan key:generate
  - Run the following command to generate the application key:
  
  7. php artisan migrate
  - Run this to set up tables into your local database through the migration files made in the database folder
  
  8. npm run dev
  - Build the React frontend assets using the following command
  
  9. php artisan serve
  - Run the Laravel development server

</p>

<h2>Troubleshooting</h2>
<p>
  If you encounter permission issues, check directory permissions for storage and bootstrap/cache:
  chmod -R 775 storage bootstrap/cache

  Clear caches if something doesn't seem to work:
  php artisan config:cache
  php artisan route:cache
  php artisan view:clear
</p>
