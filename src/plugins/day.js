import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import zhCN from 'dayjs/locale/zh-cn';
dayjs.locale(zhCN)
dayjs.extend(relativeTime)
dayjs.extend(duration)
export default dayjs