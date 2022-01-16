import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { getRepository, Repository } from "typeorm";
import { GuildBanLog } from "../../typeorm/entities/GuildBanLog";
import { ModerationLog } from "../../typeorm/entities/ModerationLog";

export default class BanCommand extends BaseCommand {
  constructor(
    private readonly modLogRepository: Repository<ModerationLog> = getRepository(
      ModerationLog
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

      const guildBan = this.modLogRepository.create({
        guildId: message.guildId!,
        issuedBy: message.author.id,
        issuedOn: date,
        type: "ban",
        reason,
        memberId,
      });
      await this.modLogRepository.save(guildBan);
    } catch (err) {
      console.log(err);
    }
  }
}
