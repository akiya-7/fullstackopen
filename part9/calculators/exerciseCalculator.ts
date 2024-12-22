interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string,
    target: number,
    average: number,
}
interface Input {
    workoutHours: number[];
    targetHours: number;
}

export const calculateExercises = (workoutHours: number[], targetHours: number): Result => {
    const totalHours: number = workoutHours.reduce((sum,hours) => sum += hours, 0);
    const averageHours: number = totalHours / workoutHours.length;

    let rating: number;
    let ratingDescription: string = "";

    if (averageHours < (targetHours * 0.8)) {
        rating = 1;
        ratingDescription = "Your average hours was less than expected, consider adjusting your target time or reassessing your workouts.";
    }
    else if (averageHours > (targetHours * 0.8) && averageHours < targetHours) {
        rating = 2;
        ratingDescription = "So close! Keep up the work for another cycle and I'm sure you'll reach the goal next time.";
    }
    else {
        rating = 3;
        ratingDescription = "Smashed it! Congratulations on hitting your target goal!";
    }

    return {
        periodLength: workoutHours.length,
        trainingDays: workoutHours.filter((hours: number) => hours > 0).length,
        success: averageHours >= targetHours,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetHours,
        average: averageHours
    };
};

const validateInput = (args: string[]): Input => {
    if (args.length < 4) {
        throw new Error("Invalid input. There needs to be at least 2 numbers.");
    }

    const workoutHours: number[] = [];

    for (let i = 2; i < (args.length - 1); i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error("Invalid input. The workout hours must be numbers.");
        }

        workoutHours.push(Number(args[i]));
    }

    const targetHours = Number(args[(args.length - 1)]);

    if ( isNaN(targetHours) ) {
        throw new Error("Invalid input. The target hours must be numbers.");
    }


    return {
        workoutHours: workoutHours,
        targetHours: targetHours
    };
};

const main = (args: string[]): number => {
    try {
        const {targetHours, workoutHours}: Input = validateInput(args);
        console.log(calculateExercises(workoutHours, targetHours));
        return 0;
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            console.error("Error:", e.message);
        }
        else {
            console.error("An unknown error occurred.");
        }
        return 1;
    }
};

if (require.main === module) {
    main(process.argv);
}