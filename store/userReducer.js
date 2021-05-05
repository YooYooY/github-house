import * as TYPES from './action-types'
export const initUserState = {}

export default function userReducer(state = initUserState, action) {
  switch (action.type) {
    case TYPES.LOGOUT:
        return {}
    default:
      return state
  }
}
