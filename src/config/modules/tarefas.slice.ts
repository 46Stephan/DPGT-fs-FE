import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api.services";
import { TarefasModel } from "../../models/Tarefas";

/**
 * 
 * @returns 
 */
export const tarefasThunk = createAsyncThunk<TarefasModel[], void, { rejectValue: string }>(
  "tarefas/get",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/tarefas");
      return response.data.data as TarefasModel[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const tarefasSlice = createSlice({
  name: "Tarefas",
  initialState: [] as TarefasModel[],
  reducers: {
    adicionarTarefa(state, action: PayloadAction<TarefasModel>) {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      tarefasThunk.fulfilled,
      (_state, action: PayloadAction<TarefasModel[]>) => {
        return action.payload;
      }
    );
  },
});

export const { adicionarTarefa } = tarefasSlice.actions;
export default tarefasSlice.reducer;
