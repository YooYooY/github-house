import * as TYPES from './action-types'

export function add(num = 10) {
  return {
    type: TYPES.ADD,
    num,
  }
}

export function addPromise() {
  return (dispatch, state) => {
    setTimeout(() => {
      dispatch(add(99))
    }, 1000)
  }
}

export function changeName(name = 'new name') {
  return {
    type: TYPES.UPDATE_USERNAME,
    name,
  }
}

export function addList(value){
    return {
        type: TYPES.ADD_LIST,
        value
    }
}

export function removeList(id){
    return {
        type: TYPES.REMOVE_LIST,
        id
    }
}

export function toggleList(id){
    return {
        type: TYPES.TOGGLE_LIST,
        id
    }
}