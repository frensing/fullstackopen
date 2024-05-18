import express from "express";
import calculateBmi from "./bmiCalculator";
import { isNotNumber } from "./utils";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: dailyExercises, target } = req.body;

  if (
    !(dailyExercises instanceof Array) ||
    dailyExercises.some(isNaN) ||
    isNotNumber(target)
  ) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  res.send(calculateExercises(dailyExercises as number[], target as number));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
