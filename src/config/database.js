const databaseConfig = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE_NAME,
  define: {
    paranoid: true,
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    ssl: {
      require: process.env.POSTGRES_SSL_SUPPORT,
      rejectUnauthorized: false,
    },
  },
};

if (
  process.env.NODE_ENV === 'test' ||
  process.env.POSTGRES_SSL_SUPPORT === false
) {
  databaseConfig.dialectOptions = {};
}

module.exports = databaseConfig;
