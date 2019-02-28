import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.appServices = {
    appServices: []
}

export const actionCreators = {
    loadAppServices: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://azureproxy.azurewebsites.us/appservices/allServices", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY
            })

        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadServices, appServices: data })
            })
    }
}

export const reducer: Reducer<types.appServices> = (state: types.appServices, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadServices:
            return { ...state, appServices: action.appServices }
    }
    return state || unloadedState
}