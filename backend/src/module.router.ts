import { Routes } from 'nest-router';
import { UserModule } from './api/user/user.module';

const MODULES = [UserModule];
const ROUTES: Routes = [{ path: '/user', module: UserModule }];

export { ROUTES, MODULES };
