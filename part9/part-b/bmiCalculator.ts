
interface bmiValues{
    value1: number;
    value2: number;
}


const parseArguments = (args: Array<string>): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };



export const calculateBmi = (heigth: number, mass: number):  string => {
    const result = mass / ((heigth/100)**2);
    if( result < 16.0 ){
        return 'Underweight (Severe thinness)';
    }
    if(result >= 16.0 && result <= 16.9){
        return 'Underweight (Moderate thinness)';
    }
    if(result >= 17.0 && result <= 18.4){
        return 'Underweight (Mild thinness)';
    }
    if(result >= 18.5 && result <= 24.9){
        return 'Normal (healthy weight)';
    }
    if(result >= 25.0 && result <= 29.9){
        return 'Overweight (Pre-obese)';
    }
    if(result >= 30.0 && result <= 34.9){
        return 'Obese (Class I)';
    }
    if(result >= 35.0 && result <= 39.9){
        return 'Obese (Class II)';
    }
    if(result > 40.0){
        return 'Obese (Class III)';
    }
    throw new Error('Provided values were not numbers!');
    
};



try{
     const {  value1, value2 } = parseArguments(process.argv);
     console.log(calculateBmi(value1, value2));
}catch(error: unknown){
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
