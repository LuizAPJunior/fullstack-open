import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry, EntryWithoutId, Entry } from '../types';
import { v4 as uuidv4} from 'uuid';

const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id,name,dateOfBirth,gender, occupation, entries}) => ({id,name,dateOfBirth,gender, occupation,entries}));
};

const addPatient = (
    entry: NewPatientEntry
  ): Patient => { 
    
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: EntryWithoutId, id: string ): Entry => {
   const newEntry = {
    id: uuidv4(),
    ...entry
   };
   patients.map((patient) => {
    if(patient.id === id){
        patient.entries.push(newEntry);
        return patient;
    }
    return patient;
  });
   return newEntry;
};

const findById = (id: string): Patient | undefined => {
   const entry = patients.find((patient)=> patient.id === id );
   return entry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
    addEntry
};