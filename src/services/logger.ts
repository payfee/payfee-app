/* eslint-disable no-console */
export default class Logger {
  public static debug(message: string, data?: object) {
    console.log(message, data);
  }
}
