import { GuildConfiguration } from './entities/GuildConfiguration';
import { Session } from './entities/Session';
import { User } from './entities/User';
import { GuildBanLog } from './entities/GuildBanLog';
import { ModerationLog } from './entities/ModerationLog';

export const entities = [
  GuildConfiguration,
  User,
  Session,
  GuildBanLog,
  ModerationLog,
];
