import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import * as constants from "./constants";
import * as types from "./types";

const unloadedState: types.serverlessApps = {
  serverlessApps: []
};

export const actionCreators = {
  loadServerlessApps: (): AppThunkAction<any> => dispatch => {
    fetch(
      "https://azureproxy.azurewebsites.us/serverlessApps/allServerlessApps",
      {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + process.env.REACT_APP_AZURE_PROXY
        })
      }
    )
      .then(res => res.json())
      .then(data => {
        dispatch({ type: constants.loadServerless, serverlessApps: data });
      });
  },
  addServerlessApp: (
    appName,
    runtime
  ): AppThunkAction<any> => async dispatch => {
    const response = await fetch(
      "https://azureproxy.azurewebsites.us/provision/lambda?appName=" +
        appName +
        "&runtime=" +
        runtime,
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + process.env.REACT_APP_AZURE_PROXY,
          "Content-Type": "application/json"
        })
      }
    );
    const newApp = await response.json();
    await dispatch({ type: constants.addServerlessApp, serverlessApp: newApp });
    return;
  }
};

export const reducer: Reducer<types.serverlessApps> = (
  state: types.serverlessApps,
  incomingAction: Action
) => {
  const action = incomingAction as any;
  switch (action.type) {
    case constants.loadServerless:
      return { ...state, serverlessApps: action.serverlessApps };
    case constants.addServerlessApp:
      return {
        ...state,
        serverlessApps: state.serverlessApps.concat(action.serverlessApp)
      };
  }
  return state || unloadedState;
};
