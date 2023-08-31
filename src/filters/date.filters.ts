/** External dependencies */
// @ts-ignore
import _ from "lodash";
import moment from 'moment';
import { months } from '@/constants/date.constant';

export default {

  dayjs(dataStr: string, pattern: any = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
  },

  datetime(dataStr: string, pattern: any = "DD/MM/YYYY HH:mm:ss") {
    return moment(dataStr).format(pattern);
  },

  time(dataStr: string, pattern: any = "HH:mm:ss") {
    return moment(dataStr).format(pattern);
  },

  monthFromYYYYMM(dataStr: string, pattern: any = "MMMM YYYY") {
    return moment(dataStr, "YYYYMM").format(pattern);
  },

  date(dataStr: string, pattern: any = "DD-MM-YYYY") {
    if (!dataStr) return "Sin fecha";
    if (dataStr === "Por definir") return "Por Definir";
    return moment(dataStr).format(pattern);
  },

  period_date(dataStr: string, pattern: any = "MM/YYYY") {
    if (!dataStr) return "Sin fecha";
    if (dataStr === "Por definir") return "Por Definir";
    return moment(dataStr).format(pattern);
  },

  month(value: any) {
    const found = _.find(months, (month) => parseInt(`${month.key}`, 10) === parseInt(`${value}`, 10));
    return (found) ? found.value : "No definido";
  }

};
