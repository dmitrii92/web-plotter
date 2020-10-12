import React, { useRef, useEffect } from "react";
import Graph from "./Graph";
import { useSelector } from "react-redux";
import { selectExpression, selectMax, selectMin } from "../calculator/calculatorSlice";

export const Graphic = () => {
  const canvasRef = useRef(null);
  const canvasHeigth = 400;
  const canvasWidth = 400;
  let graph: Graph = new Graph(canvasWidth, canvasHeigth);
  const expression = useSelector(selectExpression);
  const min = useSelector(selectMin);
  const max = useSelector(selectMax);

  useEffect(() => {
    if (expression) {
      graph.setCanvas(canvasRef.current);
      graph.plot(expression, min, max);
    }
  }, [expression, min, max]);

  return (
    <div style={{ padding: "10px" }}>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeigth} />
    </div>
  );
};
