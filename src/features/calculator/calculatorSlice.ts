import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface CalculatorState {
  expression: string;
  min: number;
  max: number;
  calcType: string;
}

const initialState: CalculatorState = {
  expression: "",
  min: 0,
  max: 10,
  calcType: "custom",
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    calculate: (state, action) => {
      state.expression = action.payload.expression;
      state.min = action.payload.min;
      state.max = action.payload.max;
    },
    changeCalculator: (state, action) => {
      state.calcType = action.payload;
    },
  },
});

export const { calculate } = calculatorSlice.actions;

export const { changeCalculator } = calculatorSlice.actions;

export const selectExpression = (state: RootState) => state.calculator.expression;
export const selectMin = (state: RootState) => state.calculator.min;
export const selectMax = (state: RootState) => state.calculator.max;
export const selectCalcType = (state: RootState) => state.calculator.calcType;

export default calculatorSlice.reducer;
