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

console.log(calculateBmi(180, 74))