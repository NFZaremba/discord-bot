import { TeamConfig } from "./config";

export {};

declare global {
  namespace NodeJS {
    export interface Global {
      conquest: {
        [key: string]: TeamConfig;
      };
    }
  }
}
