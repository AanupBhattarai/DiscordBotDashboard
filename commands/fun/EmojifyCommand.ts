import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class EmojifyCommand extends BaseCommand {
  constructor() {
    super("emojify", "fun", []);
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const embedSpecify = new MessageEmbed();
    embedSpecify
      .setColor("RED")
      .setDescription("Please specify a text to translate!");

    if (!args.length) return message.reply({ embeds: [embedSpecify] });

    const specialCodes: Record<number | string, string> = {
      0: ":zero:",
      1: ":one:",
      2: ":two:",
      3: ":three:",
      4: ":four:",
      5: ":five:",
      6: ":six:",
      7: ":seven:",
      8: ":eight:",
      9: ":nine:",
      "#": ":hash:",
      "*": ":asterisk:",
      "?": ":grey_question:",
      "!": ":grey_exclamation:",
      " ": "   ",
    };

    const text = args
      .join(" ")
      .toLowerCase()
      .split("")
      .map((letter) => {
        if (/[a-z]/g.test(letter)) {
          return `:regional_indicator_${letter}:`;
        } else if (specialCodes[letter]) {
          return `${specialCodes[letter]}`;
        }
        return letter;
      })
      .join("");

    message.reply(text);
  }
}
