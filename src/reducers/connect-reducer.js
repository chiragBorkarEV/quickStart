import { actionTypes } from '../actions/index'

const initialState = {
  connected: false,
  connecting: false
}

export function connectReducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.DATA_CONNECT: 
      return {
        ...state,
        connecting: true
      }

    default: return state
  }
}