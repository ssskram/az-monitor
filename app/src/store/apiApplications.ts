import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.apiApps = {
    apiApps: []
}

export const actionCreators = {
    loadApiApps: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://azureproxy.azurewebsites.us/apiApps/allApis", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY
            })

        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadApis, apiApps: data })
            })
    },
    addApiApp: (appName): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch("https://azureproxy.azurewebsites.us/provision/api?appName=" + appName, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY,
                'Content-Type': 'application/json'
            })
        })
        const newApp = await response.json()
        await dispatch({ type: constants.addApiApp, apiApp: newApp })
        return
    },
}

export const reducer: Reducer<types.apiApps> = (state: types.apiApps, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadApis:
            return { ...state, apiApps: action.apiApps }
        case constants.addApiApp:
            return { ...state, apiApps: state.apiApps.concat(action.apiApp) }
    }
    return state || unloadedState
}