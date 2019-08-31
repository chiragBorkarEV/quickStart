import { actions as dataActions } from './dataActions'

export const actionTypes = {
  DATA_CONNECT: 'DATA_CONNECT',
  DATA_CONNECTING: 'DATA_CONNECTING'
}

export const dataSources = [
  { name: 'ACCOUNTS_MONTHLY', endpoint: 'data/accounts_monthly.json' },
  { name: 'AUM_MONTHLY', endpoint: 'data/aum_monthly.json' },
  { name: 'GROSS_FLOWS_MONTHLY_EXISTING', endpoint: 'data/gross_flows_monthly_existing.json' },
  { name: 'GROSS_FLOWS_MONTHLY_NEW', endpoint: 'data/gross_flows_monthly_new.json' },
  { name: 'CONSULTANT_AUM', endpoint: 'data/consultant_aum.json' },
  { name: 'CLIENT_AUM', endpoint: 'data/client_aum.json' },
  { name: 'STRATEGY_AUM', endpoint: 'data/strategy_aum.json' },
  { name: 'CHANNEL_AUM', endpoint: 'data/channel_aum.json' },
  { name: 'MULTI_SELECT', endpoint: 'data/multi_select.json' }
]

function dataConnect() {
  return dispatch => {
    dataConnecting(true)

    dataSources.forEach(dataSource => {
      dispatch(dataActions.fetchData(dataSource))
    })
  }
}

function dataConnecting(connecting) {
  return {
    type: actionTypes.DATA_CONNECTING,
    payload: connecting
  }
}

export const actions = {
  dataConnect,
  dataConnecting
}