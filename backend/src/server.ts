import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { UserController } from './controllers/user.controller';
import { HealthController } from './controllers/health.controller';
import { AdminUserController } from './controllers/admin/user.controller';
import { AdminScenarioController } from './controllers/admin/scenario.controller';
import { AdminImageController } from './controllers/admin/image.controller';
import { ScenarioController } from './controllers/scenario.controller';
import { ConversationController } from './controllers/conversation.controller';
import { AzureController } from './controllers/azure.controller';

validateEnv();

const app = new App([
  IndexController,
  UserController,
  HealthController,
  AdminUserController,
  AdminScenarioController,
  AdminImageController,
  ScenarioController,
  ConversationController,
  AzureController,
]);

app.listen();
