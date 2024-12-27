interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface AbstractCoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends AbstractCoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends AbstractCoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends AbstractCoursePartDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <p key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <i>{part.description}</i>
              </p>
            );

          case "group":
            return (
              <p key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                project exercises {part.groupProjectCount}
              </p>
            );
          case "background":
            return (
              <p key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <i>{part.description}</i>
                <br />
                submit to {part.backgroundMaterial}
              </p>
            );
          case "special":
            return (
              <p key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <i>{part.description}</i>
                <br />
                required skills: {part.requirements.join(", ")}
              </p>
            );
        }
      })}
    </>
  );
};
export default Content;
