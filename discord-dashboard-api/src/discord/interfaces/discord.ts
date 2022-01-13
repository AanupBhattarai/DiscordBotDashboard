import { AxiosResponse } from 'axios';
import { PartialGuildChannel } from 'src/utils/types';

export interface IDiscordService {
  getBotGuilds();
  getUserGuilds(accessToken: string);
  getMutualGuilds(accessToken: string);
  getGuildChannels(
    guildId: string,
  ): Promise<AxiosResponse<PartialGuildChannel[]>>;
}
