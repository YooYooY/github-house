import { combineReducers, createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer, { initUserState } from './userReducer'

const reducer = combineReducers({
  user: userReducer,
})

export default function initializeStore(initState = {}) {
  const store = createStore(
    reducer,
    Object.assign(
      {},
      {
        user: initUserState,
      },
      initState
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )
  return store
}
