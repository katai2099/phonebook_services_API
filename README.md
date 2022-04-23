# phonebook_services_API

phonebook service API

- Please create .env to store information regarding Database connection

  - DATABASE_NAME = name of your database
  - DATABASE_USER = username of your user
  - DATABASE_PASSWORD = password of your user

- TO create a new database make sure you point to the correct database using a valid credential
  by update the value in both config/config.json and .env file

- After running NPM install you can run the command 'npm run create' which will take care of
  Database, table creation as well as populate the table with data.

- You can repopulate the table with 'npm run repopulate' command

- You can drop the database by using 'npm run drop' command
