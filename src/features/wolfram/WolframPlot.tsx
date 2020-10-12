import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectExpression, selectMax, selectMin } from "../calculator/calculatorSlice";
import { getGraph } from "./api/Wolfram";
import { WolframResponeDto } from "./api/WolframResponse";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

const WolframPlot = () => {
  const expression = useSelector(selectExpression);
  const min = useSelector(selectMin);
  const max = useSelector(selectMax);
  const [wolframResult, setWolframResult] = useState<WolframResponeDto>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cleanupFunction = false;
    if (expression) {
      setIsLoading(true);
      setError("");
      setWolframResult(null);
      getGraph(`${expression}, x = ${min} to ${max}`)
        .then((result) => {
          if (!cleanupFunction) {
            setWolframResult(result);
          }
        })
        .catch((reason) => {
          if (reason.response) {
            setError(reason.response.data);
          } else {
            setError(reason.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return () => (cleanupFunction = true);
  }, [expression, min, max]);

  return (
    <div style={{ padding: "10px" }}>
      {isLoading ? <CircularProgress /> : null}
      {error ? <Alert severity="error">{error}</Alert> : null}
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
