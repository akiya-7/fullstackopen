interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string,
    target: number,
    average: number,
}

const calculateExercises = (workoutHours: number[], targetHours: number): Result => {
    const totalHours: number = workoutHours.reduce((sum,hours) => sum += hours, 0)
    const averageHours: number = totalHours / workoutHours.length

    let rating: number;
    let ratingDescription: string = "";

    if (averageHours < (targetHours * 0.8)) {rating = 1;}
    else if (averageHours > (targetHours * 0.8) && averageHours < targetHours) {rating = 2;}
    else {rating = 3;}

    switch (rating){
        case 1:
            ratingDescription = "Your average hours was less than expected, consider adjusting your target time or reassessing your workouts.";
            break;
        case 2:
            ratingDescription = "So close! Keep up the work for another cycle and I'm sure you'll reach the goal next time.";
            break;
        case 3:
            ratingDescription = "Smashed it! Congratulations on hitting your target goal!";
            break;
    }

    return {
        periodLength: workoutHours.length,
        trainingDays: workoutHours.filter((hours: number) => hours > 0).length,
        success: averageHours > targetHours,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetHours,
        average: averageHours
    }
}

console.log(calculateExercises([0,0,0,4,1,5,21,0], 4))