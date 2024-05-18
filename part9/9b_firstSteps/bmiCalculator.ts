import { isNotNumber } from "./utils";

interface Measurements {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  switch (true) {
    case bmi < 16:
      return "Underweight (Severe thinness)";
    case bmi < 17:
      return "Underweight (Moderate thinness)";
    case bmi < 18.5:
      return "Underweight (Mild thinness)";
    case bmi < 25:
      return "Normal (healthy weight)";
    case bmi < 30:
      return "Overweight (Pre-obese)";
    case bmi < 35:
      return "Obese (Class I)";
    case bmi < 40:
      return "Obese (Class II)";
    case bmi >= 40:
      return "Obese (Class III)";
  }
};

const parseArguments = (args: string[]): Measurements => {
  if (args.length != 4) throw new Error("Please provide 2 arguments!");

  if (isNotNumber(args[2]) || isNotNumber(args[3]))
    throw new Error("Provided values were not numbers!");

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
