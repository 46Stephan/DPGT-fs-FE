import { combineReducers } from "@reduxjs/toolkit";
import tarefasSlice from "./modules/tarefas.slice";

export const rootReducer = combineReducers({
  tarefas: tarefasSlice,
});
