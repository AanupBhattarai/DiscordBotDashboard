import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants';
import { WebSocketHandler } from 'src/websocket/socket';
import { IGuildsService } from '../interfaces/guilds';

@Controller(ROUTES.GUILDS)
export class GuildsController {
  constructor(
    @Inject(SERVICES.GUILDS) private readonly guildsService: IGuildsService,
    @Inject(WebSocketHandler) private readonly wsHandler: WebSocketHandler,
  ) {}
  @Get('config/:guildId')
  async getGuildConfig(@Param('guildId') guildId: string) {
    const guildConfig = await this.guildsService.getGuildConfig(guildId);

    if (!guildConfig)
      throw new HttpException(
        'Guild Configuration was not found',
        HttpStatus.NOT_FOUND,
      );

    return guildConfig;
  }

  @Post(':guildId/config/prefix')
  async updateGuildPrefix(
    @Param('guildId') guildId: string,
    @Body('prefix') prefix: string,
  ) {
    const config = await this.guildsService.updateGuildPrefix(guildId, prefix);
    this.wsHandler.guildPrefixUpdate(config);
    return config;
  }

  @Post(':guildId/config/welcome')
  async updateWelcomeChannel(
    @Param('guildId') guildId: string,
    @Body('channelId') channelId: string,
  ) {
    return this.guildsService.updateWelcomeChannel(guildId, channelId);
  }

  @Get(':guildId/bans')
  async getGuildBans(
    @Param('guildId') guildId: string,
    @Query('fromDate') fromDate: Date,
  ) {
    return this.guildsService.getGuildBans(guildId, fromDate);
  }
}
