declare global {
  namespace NodeJs {
    interface ProcessEnv {
      DISCORD_BOT_TOKEN: string;
      WEATHER_TOKEN: string;
      environment: "dev" | "prod" | "debug";
    }
  }
}

export {};
