import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC (utcString: string) {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
  return resultTime
}
