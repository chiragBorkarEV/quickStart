export const actionTypes = {
  DATA: 'DATA',
  DATA_LOADING: 'DATA_LOADING',
  DATA_ERROR: 'DATA_ERROR',
  RECEIVED_DATA: 'RECEIVED_DATA',
}

function fetchData({ name, endpoint }) {
  return dispatch => {
    dispatch(dataLoading({ dataSource: name }))

    fetch(endpoint).then(res => {
      if (!res.ok) throw Error(res.statusText)
      return res
    })
      .then(res => res.json())
      .then(data => dispatch(receiveData({ dataSource: name, data })))
      .catch(err => dispatch(dataError(err)))
  }
}

function dataLoading(loading) {
  return {
    type: actionTypes.DATA_LOADING,
    payload: loading
  }
}

function dataError(err) {
  return {
    type: actionTypes.DATA_ERROR,
    payload: err
  }
}

function receiveData(data) {
  return {
    type: actionTypes.RECEIVED_DATA,
    payload: data
  }
}

export const actions = {
  fetchData,
  dataLoading,
  dataError,
  receiveData
}