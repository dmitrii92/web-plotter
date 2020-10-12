import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculate, changeCalculator, selectCalcType } from "./calculatorSlice";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useFormik } from "formik";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

export function Calculator() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const formik = useFormik<{ expression: string; min: number; max: number }>({
    initialValues: { expression: "", min: 0, max: 10 },
    onSubmit: (values) => {
      dispatch(calculate({ expression: values.expression, min: values.min, max: values.max }));
    },
    validate: (values) => {
      const errors: { expression?: string; min?: string; max?: string } = {};
      if (!values.expression) {
        errors.expression = "Must be not empty";
      }
      if (!values.min && values.min !== 0) {
        errors.min = "Must be not empty";
      }
      if (!values.max && values.max !== 0) {
        errors.max = "Must be not empty";
      }
      if (values.min && values.max) {
        if (values.min >= values.max) {
          errors.max = "Max must be more then min";
        }
      }
      return errors;
    },
  });

  return (
    <div>
      <form
        className={classes.root}
        id="calculator-form-id"
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <TextField
            id="id-expression"
            name="expression"
            required
            label="Expression"
            value={formik.values.expression}
            onChange={formik.handleChange}
            error={formik.errors.expression ? true : false}
            helperText={formik.errors.expression}
          />
          <div>
            <TextField
              id="id-min"
              name="min"
              required
              label="Min"
              value={formik.values.min}
              onChange={formik.handleChange}
              error={formik.errors.min ? true : false}
              helperText={formik.errors.min}
              type="number"
            />
            <TextField
              id="id-max"
              name="max"
              required
              label="Max"
              value={formik.values.max}
              onChange={formik.handleChange}
              error={formik.errors.max ? true : false}
              helperText={formik.errors.max}
              type="number"
            />
          </div>
        </div>
        <Button variant="contained" color="primary" type="submit">
          Plot
        </Button>
      </form>
    </div>
  );
}
