import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calculator } from "./features/calculator/Calculator";
import { changeCalculator, selectCalcType } from "./features/calculator/calculatorSlice";
import { Graphic } from "./features/graphic/Graphic";
import WolframPlot from "./features/wolfram/WolframPlot";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

function App() {
  const dispatch = useDispatch();

  const calcType = useSelector(selectCalcType);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeCalculator((event.target as HTMLInputElement).value));
  };
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Calculator type</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={calcType} onChange={handleChange}>
          <FormControlLabel value="custom" control={<Radio />} label="Custom" />
          <FormControlLabel value="wolfram" control={<Radio />} label="Wolfram" />
        </RadioGroup>
      </FormControl>
      <Calculator />
      {calcType === "custom" ? <Graphic /> : <WolframPlot />}
    </div>
  );
}

export default App;
