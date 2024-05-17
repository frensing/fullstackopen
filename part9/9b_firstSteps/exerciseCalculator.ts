interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
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
  console.log(meanAbsoluteError);

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
