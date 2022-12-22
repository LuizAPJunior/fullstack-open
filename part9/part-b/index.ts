/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get(`/bmi`, (req, res) => { 
  if(!req.query.height || !req.query.weight || isNaN(Number(req.query.height))|| isNaN(Number(req.query.weight))){
    res.send({
        error: "malformatted parameters"
      });
  }  
  const{height, weight} = req.query;  
  const bmi = calculateBmi(Number(height), Number(weight));
  res.send(JSON.stringify({height, weight, bmi}));
});

app.post('/exercises', (req, res) => {
 
  
  if(!req.body.target || !req.body.daily_exercises){
    res.send({
      error: "parameters missing"
    });
  }
  console.log(req.body);
  const dailyExercises = req.body.daily_exercises.every((day: unknown) => typeof day === 'number');
  if(typeof req.body.target !== 'number'|| !dailyExercises){
    res.send({
        error: "malformatted parameters"
      });
  } 
  
  const exercises = calculateExercises(req.body.daily_exercises, req.body.target);
  console.log(exercises);
  
  res.json(exercises);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});