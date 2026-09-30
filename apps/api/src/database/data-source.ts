import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: ['.env', '../../.env'] });

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
