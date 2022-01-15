import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class PingCommand extends BaseCommand {
  constructor() {
    super("userrole", "info", ["roleinfo"]);
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
            "Please use a proper mention if you want to see someone else's roles."
          );
        return message.reply({ embeds: [errormention] });
      }
      const Member = message.guild?.members.cache.get(user.id);
      const memberRoles = Member?.roles.cache
        .filter((roles) => roles.id !== message.guild?.id)
        .map((role) => role.toString());

      const embedRole = new MessageEmbed();
      embedRole
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${user}**'s roles** => ${memberRoles}`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter("ACE", client.user?.displayAvatarURL({ dynamic: true }));
      return message.reply({ embeds: [embedRole] });
    }
    const Member = message.guild?.members.cache.get(message.author.id);
    const memberRoles = Member?.roles.cache
      .filter((roles) => roles.id !== message.guild?.id)
      .map((role) => role.toString());

    const embedOwn = new MessageEmbed();
    embedOwn
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(`**Your roles** => ${memberRoles}`)
      .setColor("GREEN")
      .setTimestamp()
      .setFooter("ACE", client.user?.displayAvatarURL({ dynamic: true }));

    message.reply({ embeds: [embedOwn] });
  }
}
