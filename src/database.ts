import {DataSource} from 'typeorm';
import {Feedback} from './entity/Feedback';
import {User} from './entity/User';

const currentEnv = process.env.NODE_ENV || 'development';
let AppSource: DataSource;

AppSource = new DataSource({
  type: 'sqlite',
  database: 'dev.sqlite',
  synchronize: true,
  entities: [User, Feedback]
});

if (currentEnv === 'test') {
  // TODO
}

if (currentEnv === 'production') {
  // TODO
}

export default AppSource;
