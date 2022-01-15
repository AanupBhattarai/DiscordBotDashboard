import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class AvatarCommand extends BaseCommand {
  constructor() {
    super("avatar", "info", []);
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    function getUserFromMention(mention: string) {
      if (!mention) return;

      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);

        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
      }
    }
    if (args[0]) {
      const user = getUserFromMention(args[0]);
      if (!user) {
        const errormention = new MessageEmbed();

        errormention
          .setColor("RED")
          .setDescription(
            "Please use a proper mention if you want to see someone else's avatar."
          );
        return message.reply({ embeds: [errormention] });
      }
      const embedMention = new MessageEmbed();

      embedMention
        .setAuthor(`${user.tag}'s Avatar`)
        .setImage(`${user.displayAvatarURL({ dynamic: true, size: 256 })}`)
        .setColor("GREEN");

      return message.reply({ embeds: [embedMention] });
    }
    const embedOwn = new MessageEmbed();

    embedOwn
      .setAuthor(`${message.author.tag} Your Avatar`)
      .setImage(message.author.displayAvatarURL({ dynamic: true, size: 256 }))
      .setColor("GREEN");

    message.reply({ embeds: [embedOwn] });
  }
}
