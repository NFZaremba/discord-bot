export {};

declare global {
  namespace NodeJS {
    export interface Global {
      groupOne: Array<any>;
      groupTwo: Array<any>;
      groupOneMsgId: string | null;
      groupTwoMsgId: string | null;
    }
  }
}
