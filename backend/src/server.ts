import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { UserController } from '@controllers/user.controller';
import { HealthController } from '@controllers/health.controller';
import { AdminUserController } from '@controllers/admin/user.controller';
import { AdminScenarioController } from '@controllers/admin/scenario.controller';
import { AdminScenarioIntroTextController } from '@controllers/admin/scenario-intro-text.controller';
import { AdminCategoryController } from '@controllers/admin/category.controller';
import { AdminImageController } from '@controllers/admin/image.controller';
import { CategoryController } from '@controllers/category.controller';
import { ScenarioController } from '@controllers/scenario.controller';
import { ScenarioIntroTextController } from '@controllers/scenario-intro-text.controller';
import { ConversationController } from '@controllers/conversation.controller';
import { AzureController } from '@controllers/azure.controller';
import { AdminExternalUserController } from '@controllers/admin/external-user.controller';

validateEnv();

const app = new App([
  IndexController,
  UserController,
  HealthController,
  AdminUserController,
  AdminScenarioController,
  AdminCategoryController,
  AdminScenarioIntroTextController,
  AdminImageController,
  CategoryController,
  ScenarioController,
  ScenarioIntroTextController,
  ConversationController,
  AzureController,
  AdminExternalUserController,
]);

app.listen();
