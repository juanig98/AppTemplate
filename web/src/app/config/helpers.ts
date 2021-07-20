import { environment } from "src/environments/environment";
import { DatePipe } from '@angular/common';

export function devConsoleLog(...string: any) { if (!environment.production) console.log(string) };

export function isEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const dp = new DatePipe('es-AR');

export const redirect = function (to: string, open = false) { (open) ? window.open(to) : window.location.href = to; }

export function formatTimestamp(format = new Date(), seconds = false) {
  return dp.transform(format, (seconds) ? 'dd/MM/YYYY hh:mm:ss' : 'dd/MM/YYYY hh:mm')
}
export function formatTime(data: Date | string) { return (data instanceof Date) ? dp.transform(data.getTime() + 60000, 'hh:mm') : dp.transform(new Date(data).getTime() + 60000, 'hh:mm') }
export function formatDate(data: Date | string) { return (data instanceof Date) ? dp.transform(data, 'dd/MM/YY') : dp.transform(new Date(data), 'dd/MM/YY') }
export function formatFullDate(data: Date | string) { return (data instanceof Date) ? dp.transform(data, 'fullDate') : dp.transform(new Date(data), 'fullDate') }

export function formatYear(data = new Date()) { return dp.transform(data, 'YYYY') }
export function formatMoney(data: any): string {
  if (data instanceof String) {
    try {
      data = Number(data)
      return "$ " + data.toFixed(2);
    } catch (error) {
      return "";
    }
  }
  return "$ " + data.toFixed(2);
}

