import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './utils/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DiscordModule } from './discord/discord.module';
import { GuildsModule } from './guilds/guilds.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: 3306,
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
      synchronize: true, //Dont forget to change it to true future me
      entities: entities,
    }),
    AuthModule,
    UserModule,
    DiscordModule,
    GuildsModule,
    WebSocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
