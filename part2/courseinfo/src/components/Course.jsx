const Course = ({course}) => {
    const exercises = course.parts.map(exercise => exercise.exercises)
    const totalExercises = exercises.reduce((add, curr) => add + curr, 0);

    return(
            <>
                <h1>{course.name}</h1>
                {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
                <p><strong>total of {totalExercises} exercises</strong></p>
            </>
    )
}

export default Course