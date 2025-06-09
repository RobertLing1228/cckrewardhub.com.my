After setting up the repository on your local files, open the **folder** in Visual Code. You will need to use the terminal for installs and commands.

Make sure you have Composer and Node.js installed.

Composer Download Link: https://getcomposer.org/download/

Node.js Download link: https://nodejs.org/en/download/current

<h2>Setup</h2>
In the terminal in visual code

  1. composer install
  - Use Composer to install the PHP dependencies:
  
  
  2. npm install
  - Install the required JavaScript packages:
  
  3. cp .env.example .env
  - Copy the .env.example file to .env:
  
  4. Create a new database using phpmyadmin or however you like.
  
  5. Edit the .env file to configure your database and other settings:
  <p>DB_CONNECTION=mysql</p>
  <p>DB_HOST=127.0.0.1</p>
  <p>DB_PORT=3306</p>
  <p>DB_DATABASE=your_database_name</p>
  <p>DB_USERNAME=your_database_user</p>
  <p>DB_PASSWORD=your_database_password</p>
 
  
  
  6. php artisan key:generate
  - Run the following command to generate the application key:
  
  7. php artisan migrate
  - Run this to set up tables into your local database through the migration files made in the database folder



**Development**
  (These two commands are run on two separate terminals)
  
  8. npm run dev
  - Build the React frontend assets using the following command in one terminal.
  
  9. php artisan serve
  - Run the Laravel development server in another terminal

**Production**
The .env file should specify the production state as well as the new database used.

*npm run build*
this command is used to build the frontend react assets

Note that the vite.config.js file will need to be edited to match the file structure of the web hosting used.



<h2>Troubleshooting</h2>

  If you encounter permission issues, check directory permissions for storage and bootstrap/cache:
  <p>chmod -R 775 storage bootstrap/cache</p>

  Clear caches if something doesn't seem to work:
  <p>php artisan config:cache</p>
  <p>php artisan route:cache</p>
  <p>php artisan view:clear</p>

