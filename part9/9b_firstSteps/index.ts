import express from "express";
import calculateBmi from "./bmiCalculator";
import { isNotNumber } from "./utils";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height: heightStr, weight: weightStr } = req.query;

  if (isNotNumber(heightStr) || isNotNumber(weightStr)) {
    res.send({ error: "malformatted parameters" });
    return;
  }

  const height = Number(heightStr);
  const weight = Number(weightStr);

  res.send({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
