import { CoursePart } from "../types";
import { assertNever } from "../utils";

export const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          {part.description}
        </p>
      );
    case "background":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          {part.description} <br />
          {part.backgroundMaterial}
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          Project exercises: {part.groupProjectCount}
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          {part.description}
          <br />
          Required skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part);
  }
};
