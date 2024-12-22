interface bodyInfo {
    height: number;
    weight: number;
}

const validateInput = (args: string[]): bodyInfo => {
    if (args.length != 4) {
        throw new Error("Incorrect number of arguments.")
    }
        const height = Number(args[2]);
        const weight = Number(args[3]);

        if (isNaN(height)) {
            throw new Error("Your height parameter is invalid.");
        }

        if (isNaN(weight)) {
            throw new Error("Your weight parameter is invalid.");
        }

        return {height, weight};
};

const calculateBmi = (height: number, weight: number) => {
    const bmi: number = weight / ((height/100) ** 2);

    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal Weight";
    } else if (bmi > 24.9 && bmi < 29.9) {
        return "Overweight";
    } else if (bmi >= 30) {
        return "Obese"
    }
}

const main = (args: string[]): number => {
    const {height, weight} = validateInput(args);
    console.log(calculateBmi(height, weight));
    return 1;
}

main(process.argv)