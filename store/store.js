import { combineReducers, createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import * as TYPES from './action-types'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  count: 0,
}

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ADD:
      return { count: state.count + action.num }
    default:
      return state
  }
}

const initUserState = {
  age: 28,
  username: 'chenwl',
}

function userReducer(state = initUserState, action) {
  switch (action.type) {
    case TYPES.UPDATE_USERNAME:
      return { ...state, username: action.name }
    default:
      return state
  }
}

const initToDoList = {
  list: [],
}

function todoRedurcer(state = initToDoList, action) {
  switch (action.type) {
    case TYPES.ADD_LIST:
      let list = [
        ...state.list,
        { id: Date.now() + '_todo_list', value: action.value, done: false },
      ]
      return { ...state, list }
    case TYPES.REMOVE_LIST:
      return { list: state.list.filter((item) => item.id !== action.id) }
    case TYPES.TOGGLE_LIST:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === action.id) {
            item.done = !item.done
          }
          return item
        }),
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer,
  count: counterReducer,
  todo: todoRedurcer,
})

export default function initializeStore(initState = {}) {
  const store = createStore(
    reducer,
    Object.assign(
      {},
      {
        user: initUserState,
        count: initialState,
        todo: initToDoList,
      },
      initState
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )
  return store
}
