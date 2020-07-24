1. Differences between using sessions or JSON Web Tokens for authentication.

    Usually the jwt stores session info, while in session a db server side stores session info.
    In reality best a prouch is to use a conbination of both.

2. What does bcrypt do to help us store passwords in a secure manner.

    It helps us hash and salt passwords, compare hashes

3. How are unit tests different from integration and end-to-end testing.

    In that they test a single funtion in the app and are not concerned whith testing its relationship to the rest of the app

4. How Test Driven Development changes the way we write applications and tests.

    It makes us think about the test first and then build code that satisfyes it.

npm init -y && \
npx gitignore node && \
npm i -D nodemon jest cross-env supertest && \
npm i dotenv express knex pg sqlite3 helmet bcryptjs connect-session-knex cors express-session jsonwebtoken uuid
npx npm-add-script -k test -v "cross-env DB_ENV=testing jest --watch" -f && \
npx npm-add-script -k start -v "node index.js" && \
npx npm-add-script -k server -v "nodemon index.js"