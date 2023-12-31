import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    MONGO_URL: str(),
    PORT: port({ default: 4000 }),
  });
}

export default validateEnv;
