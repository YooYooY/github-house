import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export const isServer = typeof window === 'undefined'
export const getLastUpdated = (time) => moment(time).fromNow()
