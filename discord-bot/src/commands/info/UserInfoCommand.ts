import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import moment from "moment";

export default class PingCommand extends BaseCommand {
  constructor() {
    super("userinfo", "info", []);
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
      const Member = message.guild?.members.cache.get(user.id);
      const embedMention = new MessageEmbed();

      embedMention
        .setAuthor(
          `${user.tag}'s Information`,
          user.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setColor("#0099ff")
        .addField("USERID", `${user.id}`, false)
        .addField(
          "Roles",
          `${Member?.roles.cache
            .map((r) => r)
            .join(" ")
            .replace("@everyone", " ")}`
        )
        .addField(
          "Server Member Since",
          `${moment(Member?.joinedAt).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}\n**-** ${moment(Member?.joinedAt).startOf("day").fromNow()}`
        )
        .addField(
          "Discord User Since",
          `${moment(user.createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}\n**-** ${moment(user.createdAt).startOf("day").fromNow()}`
        );
      return message.reply({ embeds: [embedMention] });
    }
    const Member = message.guild?.members.cache.get(message.author.id);
    const embedOwn = new MessageEmbed();

    embedOwn
      .setAuthor(
        `${message.author.tag} Your Information`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setColor("#0099ff")
      .addField("USERID", `${message.author.id}`, false)
      .addField(
        "Roles",
        `${Member?.roles.cache
          .map((r) => r)
          .join(" ")
          .replace("@everyone", " ")}`
      )
      .addField(
        "Server Member Since",
        `${moment(Member?.joinedAt).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}\n**-** ${moment(Member?.joinedAt).startOf("day").fromNow()}`
      )
      .addField(
        "Discord User Since",
        `${moment(message.author.createdAt).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}\n**-** ${moment(message.author.createdAt).startOf("day").fromNow()}`
      );

    message.reply({ embeds: [embedOwn] });
  }
}
