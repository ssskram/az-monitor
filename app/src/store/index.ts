import * as user from './user'
import * as types from './types'
import * as messages from './messages'
import * as appServices from './appServices'
import * as apiApps from './apiApplications'
import * as clientApps from './clientApps'
import * as serverlessApps from './serverlessApps'
import * as virtualMachines from './virtualMachines'

export interface ApplicationState {
    user: types.user,
    messages: types.messsage,
    appServices: types.appServices
    apiApps: types.apiApps
    clientApps: types.clientApps
    serverlessApps: types.serverlessApps,
    virtualMachines: types.virtualMachines
}

export const reducers = {
    user: user.reducer,
    messages: messages.reducer,
    appServices: appServices.reducer,
    apiApps: apiApps.reducer,
    clientApps: clientApps.reducer,
    serverlessApps: serverlessApps.reducer,
    virtualMachines: virtualMachines.reducer
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}