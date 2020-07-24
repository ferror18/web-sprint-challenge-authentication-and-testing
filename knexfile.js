const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/hobbits";
module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations/development',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds/development' },
  },
  testing: {
        client: "sqlite3",
        connection: {
            filename: "./data/test.db3",
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./data/migrations/testing",
        },
        seeds: {
            directory: "./data/seeds/testing",
        },
    },

    // for Heroku
    production: {
        client: "pg",
        connection: pgConnection,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./data/migrations/production",
        },
        seeds: {
            directory: "./data/seeds/production",
        },
    },
};