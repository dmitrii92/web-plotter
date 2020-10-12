import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectExpression, selectMax, selectMin } from "../calculator/calculatorSlice";
import { getGraph } from "./api/Wolfram";
import { WolframResponeDto } from "./api/WolframResponse";

const WolframPlot = () => {
  const expression = useSelector(selectExpression);
  const min = useSelector(selectMin);
  const max = useSelector(selectMax);
  const [wolframResult, setWolframResult] = useState<WolframResponeDto>(null);

  useEffect(() => {
    let cleanupFunction = false;
    if (expression) {
      getGraph(`${expression}, x = ${min} to ${max}`).then((result) => {
        if (!cleanupFunction) {
          setWolframResult(result);
        }
      });
    }
    return () => (cleanupFunction = true);
  }, [expression, min, max]);

  return (
    <div style={{ padding: "10px" }}>
      {wolframResult ? (
        <img
          src={wolframResult.imgSrc}
          width={wolframResult.imgWidth}
          height={wolframResult.imgHeigth}
          alt="Plot"
        />
      ) : null}
    </div>
  );
};

export default WolframPlot;
