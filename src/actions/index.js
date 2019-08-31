import * as dataActions from './dataActions'
import * as connectActions from './connectActions'

const actionTypes = {
  ...dataActions.actionTypes,
  ...connectActions.actionTypes,
}

const actions = {
  ...dataActions.actions,
  ...connectActions.actions,
}

export {
  actionTypes,
  actions
}