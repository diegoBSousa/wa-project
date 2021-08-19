import config from 'dotenv/config';

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  });
}
