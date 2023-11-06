import { parseISO, fromUnixTime, format, parse } from "date-fns";
import { formatInTimeZone, zonedTimeToUtc } from "date-fns-tz";

const jstTimeZone = "Asia/Tokyo";
const defaultFormatStr = "yyyy-MM-dd'T'HH:mm:ssXXX";
const displayDateFormat = "yyyy/MM/dd";
const displayDatetimeFormat = "yyyy/MM/dd HH:mm";

/**
 * JST形式の日付文字列を受け取り、画面表示用の日付の文字列を返却する
 * @param jstDateStr JSTフォーマットの日付文字列
 * @returns yyyy/MM/dd 形式の日付文字列
 */
export function JSTdateToDisplay(jstDateStr: string): string {
  const date = parse(jstDateStr, defaultFormatStr, new Date());
  return format(date, displayDateFormat);
}

/**
 * JST形式の日付文字列を受け取り、画面表示用の日時の文字列を返却する
 * @param jstDateStr JSTフォーマットの日付文字列
 * @returns yyyy/MM/dd HH:mm  形式の日時文字列
 */
export function JSTdatetimeToDisplay(jstDateStr: string): string {
  const date = parse(jstDateStr, defaultFormatStr, new Date());
  return format(date, displayDatetimeFormat);
}

/**
 * UNIX TimeまたはISO形式の文字列をJSTフォーマットの文字列に変換する
 * @param dateInput UNIX TimeまたはISO形式での日付情報
 * @returns JSTフォーマットの文字列
 */
export function convertUNIXorISOstrToJST(dateInput: string | number): string | null {
  let date: Date;

  // 数字の場合、UNIX Timeとして処理
  if (typeof dateInput === "number") {
    date = fromUnixTime(dateInput);
  }
  // 文字列の場合、ISO形式として処理
  else if (typeof dateInput === "string") {
    date = parseISO(dateInput);
  } else {
    return null; // 未知の形式の場合、nullを返す
  }

  return formatInTimeZone(date, jstTimeZone, defaultFormatStr);
}

/**
 * JSTの日付文字列をUTC時刻に変換する
 * @param dateStr yyyy-MM-dd
 * @returns UTCのDateオブジェクト
 */
export function convertJSTstrToUTCdate(dateStr: string): Date {
  return zonedTimeToUtc(dateStr, jstTimeZone);
}

/**
 * UTCの日付データをJST形式の文字列に変換する
 * @param utcDate UTC日付情報 Date | string
 * @param formatStr default: yyyy-MM-dd'T'HH:mm:ssXXX
 * @returns JSTフォーマットの文字列
 */
export function convertUTCtoJSTstr(utcDate: Date | string): string {
  if (!utcDate) return null;
  return formatInTimeZone(utcDate, jstTimeZone, defaultFormatStr);
}
