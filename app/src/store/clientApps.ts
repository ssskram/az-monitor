import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import * as constants from "./constants";
import * as types from "./types";

const unloadedState: types.clientApps = {
  clientApps: []
};

export const actionCreators = {
  loadClientApps: (): AppThunkAction<any> => dispatch => {
    fetch("https://azureproxy.azurewebsites.us/clientApps/allClients", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_AZURE_PROXY
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: constants.loadClients, clientApps: data });
      });
  },
  addClientApp: (appName): AppThunkAction<any> => async dispatch => {
    const response = await fetch(
      "https://azureproxy.azurewebsites.us/provision/client?appName=" + appName,
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + process.env.REACT_APP_AZURE_PROXY,
          "Content-Type": "application/json"
        })
      }
    );
    const newApp = await response.json();
    await dispatch({ type: constants.addClientApp, clientApp: newApp });
    return;
  }
};

export const reducer: Reducer<types.clientApps> = (
  state: types.clientApps,
  incomingAction: Action
) => {
  const action = incomingAction as any;
  switch (action.type) {
    case constants.loadClients:
      return { ...state, clientApps: action.clientApps };
    case constants.addClientApp:
      return {
        ...state,
        clientApps: state.clientApps.concat(action.clientApp)
      };
  }
  return state || unloadedState;
};
