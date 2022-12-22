interface exerciseResult{ 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number }

// interface daysValues{
//     target: number,
//    dailyExercises:  Array<number>
   
// }

// const parseArgumentsCalculator = (args: Array<string>): daysValues => {
//         if (args.length < 4) throw new Error('Not enough arguments');
//         // if (args.length > 4) throw new Error('Too many arguments');
//         const days = args.slice(3).map(hours => Number(hours));
//         const numberOfDays = days.every(hours => typeof hours === 'number');
//         console.log(days, numberOfDays);
//         if (!isNaN(Number(args[2]))) {
//           return {
//             target: Number(args[2]),
//             dailyExercises: days
//           };
//         } else {
//           throw new Error('Provided values were not numbers!');
//         }
//       };
    

export const calculateExercises = (dailyExercises: Array<number>, target: number) : exerciseResult =>{
    const exercisesCalculated: exerciseResult = {
        periodLength: 0,
        trainingDays: 0,
        success:  false,
        rating:  0,
        ratingDescription: '',
        target:  0,
        average:  0
    };

    exercisesCalculated.average = dailyExercises.reduce((allDays, currentDay)=> allDays+currentDay  ,0)/(dailyExercises.length);
    exercisesCalculated.periodLength = dailyExercises.length;
    exercisesCalculated.trainingDays = dailyExercises.filter((day)=> day > 0).length;
    exercisesCalculated.success = exercisesCalculated.average >= target;
    const calculateRating = (averageExercises: number) : void=> { 
        if((averageExercises*3)/target <= 1){
            exercisesCalculated.rating = 1;
            exercisesCalculated.ratingDescription = 'bad';
        } 
        if((averageExercises*3)/target > 1 && (averageExercises*3)/target <= 2.9){
            exercisesCalculated.rating = 2;
            exercisesCalculated.ratingDescription = 'not too bad but could be better';
        }
        if((averageExercises*3)/target >= 3){
            exercisesCalculated.rating = 3;
            exercisesCalculated.ratingDescription = 'good';
        }
    };
    exercisesCalculated.target = target;
    calculateRating(exercisesCalculated.average);
    



    return exercisesCalculated;
};    
// const {target, dailyExercises} = parseArgumentsCalculator(process.argv);
// console.log( calculateExercises(dailyExercises, target));
