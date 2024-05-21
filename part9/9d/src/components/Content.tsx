interface ContentProps {
  courseParts: PartProps[]
}

interface PartProps {
  name: string,
  exerciseCount: number,
}

const Content = (props: ContentProps) => 
  props.courseParts.map(part => <Part name={part.name} exerciseCount={part.exerciseCount} />)

const Part = (props: PartProps) => <p>{props.name} {props.exerciseCount}</p>

export default Content;