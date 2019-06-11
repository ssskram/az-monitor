import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import * as constants from "./constants";
import * as types from "./types";

const unloadedState: types.virtualMachines = {
  virtualMachines: []
};

export const actionCreators = {
  loadVirtualMachines: (): AppThunkAction<any> => dispatch => {
    fetch("https://azureproxy.azurewebsites.us/virtualMachines/allVms", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_AZURE_PROXY
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: constants.loadVirtualMachines,
          virtualMachines: data
        });
      });
  }
};

export const reducer: Reducer<types.virtualMachines> = (
  state: types.virtualMachines,
  incomingAction: Action
) => {
  const action = incomingAction as any;
  switch (action.type) {
    case constants.loadVirtualMachines:
      return { ...state, virtualMachines: action.virtualMachines };
  }
  return state || unloadedState;
};
