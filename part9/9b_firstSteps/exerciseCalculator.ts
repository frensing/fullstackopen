import { isNotNumber } from "./utils";

interface CalculatorInput {
  target: number;
  dailyExerciseHours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const trainingDays = dailyExerciseHours.filter((x) => x > 0).length;
  const average =
    dailyExerciseHours.reduce((a, b) => a + b) / dailyExerciseHours.length;

  const meanAbsoluteError =
    dailyExerciseHours
      .map((x) => Math.abs(target - x))
      .reduce((a, b) => a + b) / dailyExerciseHours.length;

  let rating;
  let ratingDescription;
  if (meanAbsoluteError < 1) {
    rating = 3;
    ratingDescription = "very good";
  } else if (meanAbsoluteError < 2) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "not very consistent";
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: string[]): CalculatorInput => {
  if (args.length <= 3) throw new Error("Please provide daily training times.");

  const input = args.slice(2);

  if (input.some(isNotNumber))
    throw new Error("Provided values were not numbers!");

  const target = Number(input[0]);
  const dailyExerciseHours = input.slice(1).map(Number);

  return {
    target,
    dailyExerciseHours,
  };
};

try {
  const { target, dailyExerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
