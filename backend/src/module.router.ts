import { Routes } from 'nest-router';
import { UserModule } from './api/user/user.module';
import { AppModule } from './app.module';

const MODULES = [UserModule];
const ROUTES: Routes = [
  { path: '/', module: AppModule },
  { path: '/user', module: UserModule },
];

export { ROUTES, MODULES };
