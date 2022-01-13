import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { getRepository, Repository } from "typeorm";
import { GuildBanLog } from "../../typeorm/entities/GuildBanLog";

export default class BanCommand extends BaseCommand {
  constructor(
    private readonly banLogRepository: Repository<GuildBanLog> = getRepository(
      GuildBanLog
    )
  ) {
    super("ban", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const [memberId, ...rest] = args;
    const reason = rest.join(" ");
    try {
      // const member = await message.guild?.members.fetch(memberId)!;
      // await member.ban({ reason });

      const date = new Date();
      date.setDate(date.getDate() - 3);

      const guildBan = this.banLogRepository.create({
        guildId: message.guildId!,
        bannedMemberId: memberId,
        issuedBy: message.author.id,
        issuedOn: date,
        reason,
      });
      await this.banLogRepository.save(guildBan);
    } catch (err) {
      console.log(err);
    }
  }
}
