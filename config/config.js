require('dotenv').config();

module.exports = {
  development: {
    username: 'tur',
    password: 'tur098',
    database: 'moc_turuta',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
  },
  production: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
  },
};
