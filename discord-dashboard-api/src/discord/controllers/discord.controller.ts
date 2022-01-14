import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorator';
import { User } from 'src/utils/typeorm/entities/User';
import { IDiscordService } from '../interfaces/discord';

@Controller(ROUTES.DISCORD)
export class DiscordController {
  constructor(
    @Inject(SERVICES.DISCORD) private readonly discordService: IDiscordService,
  ) {}

  @Get('guilds')
  getMutualGuilds(@AuthUser() user: User) {
    return this.discordService.getMutualGuilds(user.accessToken);
  }

  @Get('guilds/:guildId/channels')
  async getGuildChannels(@Param('guildId') guildId: string) {
    const { data } = await this.discordService.getGuildChannels(guildId);
    return data.filter((channel) => channel.type === 0);
  }

  @Get('guilds/:guildId/bans')
  async getGuildBans(@Param('guildId') guildId: string) {
    const { data } = await this.discordService.getGuildBans(guildId);
    return data;
  }

  @Delete('guilds/:guildId/bans/:userId')
  async deleteGuildBan(
    @Param('guildId') guildId: string,
    @Param('userId') userId: string,
  ) {
    const { data } = await this.discordService.deleteGuildBan(guildId, userId);
    return data;
  }
}
