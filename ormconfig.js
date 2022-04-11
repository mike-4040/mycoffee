module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432, // database host
  username: 'postgres', // username
  password: 'pass123', // user password
  database: 'postgres', // name of our database,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
