const Course = ({courses}) => {
    return(
        <>
        {courses.map(course => {
            const { name, parts } = course;
            const exercises = parts.map(part => part.exercises)
            const totalExercises = exercises.reduce((add, curr) => add + curr, 0);

                return (
                    <div key={course.id}>
                        <h1>{name}</h1>
                        {parts.map(part => (
                            <p key={part.id}>{part.name} {part.exercises}</p>
                        ))}
                        <p><strong>total of {totalExercises} exercises</strong></p>
                    </div>
                )
            })}
        </>
    )
}

export default Course