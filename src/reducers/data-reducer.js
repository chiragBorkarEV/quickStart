import { actionTypes } from '../actions/index'
import { dataSources } from '../actions/connectActions'

const initialState = dataSources.map(dataSource => ({
  [dataSource.name]: {
    data: [],
    loading: false,
    messages: []
  }
})).reduce((acc, val) => {
  const key = Object.keys(val)[0]

  return {
    ...acc,
    [key]: val[key]
  }
}, {})


export function dataReducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.DATA_LOADING:
      return {
        ...state,
        [action.payload.dataSource]: {
          ...state[action.payload.name],
          data: [],
          loading: true,
          messages: []
        }
      }

    case actionTypes.DATA_ERROR:
      return {
        ...state,
        [action.payload.dataSource]: {
          ...state[action.payload.dataSource],
          loading: false,
          messages: [{ type: 'error', text: action.payload.message }]
        }
      }

    case actionTypes.RECEIVED_DATA:
      return {
        ...state,
        [action.payload.dataSource]: {
          ...state[action.payload.dataSource],
          data: action.payload.data,
          loading: false
        }
      }

    default: return state
  }
}


export default dataReducer
