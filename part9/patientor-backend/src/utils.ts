import { NewPatientEntry, Gender, Entry, HealthCheckRating, Discharge, SickLeave, EntryWithoutId} from './types';


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };



const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};  

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
}; 

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
}; 

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };


  const parseEntry = (): Entry[]=> {
     const entry: Entry[] = [];
     return entry;
  }; 

  type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown};

export const toNewPatientEntry = ({  name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntry()
  };

  return newEntry;
};

//Entry fields validation

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isHealthCheckRating = (num: unknown): num is HealthCheckRating => {
  console.log(Object.values(HealthCheckRating).includes(num as HealthCheckRating));
  return Object.values(HealthCheckRating).includes(num as HealthCheckRating);
};

const isDischarge = (obj: unknown): obj is Discharge => {
  return Object.prototype.hasOwnProperty.call(obj, "date")
  && Object.prototype.hasOwnProperty.call(obj, "criteria");
};

const isSickLeave = (obj: unknown): obj is SickLeave => {
  return Object.prototype.hasOwnProperty.call(obj, "startDate")
  && Object.prototype.hasOwnProperty.call(obj, "endDate");
};

const isArray = (arr: unknown): arr is string[] => {
  if( Array.isArray(arr) || arr instanceof Array){
    const isStringArray: boolean = arr.length > 0;
    return isStringArray;
  }
  return false; 
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
      throw new Error('Incorrect or missing description');
  }

  return description;
};  

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};



const parseDiagnosisCodes = (diagnosisCodes: unknown):  string[] | undefined => {
  if (!diagnosisCodes || !isArray(diagnosisCodes)) {
    return ;
  }
  return diagnosisCodes;
  
};


const parseHealthCheckRating = ( healthCheckRating: unknown):  HealthCheckRating => {

  
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
};



const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    return; 
  }
  return sickLeave;
};


type BaseEntryFields = {description:unknown,date: unknown, specialist: unknown, diagnosisCodes?: unknown};
type HealthCheckEntryFields = {type: unknown, healthCheckRating: unknown};
type HospitalEntryFields = {type:unknown, discharge:unknown};
type OccupationalHealthcareEntryFields = {type:unknown, employerName:unknown, sickLeave?:unknown};
type EntryFields =    HealthCheckEntryFields & HospitalEntryFields & OccupationalHealthcareEntryFields;




export const toNewEntry = ((obj: EntryFields & BaseEntryFields ) : EntryWithoutId =>{
  switch(obj.type){
    case "HealthCheck":
      const newHealthCheckEntry: EntryWithoutId = {
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
        type: obj.type,
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
      };
      return newHealthCheckEntry;  
    case "Hospital":
      const newHospitalEntry: EntryWithoutId = {
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
        type: obj.type,
        discharge: parseDischarge(obj.discharge)
      };
      return newHospitalEntry;  
    case "OccupationalHealthcare":   
    const newOccupationalHealthcarEntry: EntryWithoutId = {
      description: parseDescription(obj.description),
      date: parseDate(obj.date),
      specialist: parseSpecialist(obj.specialist),
      diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
      type: obj.type,
      employerName: parseEmployerName(obj.employerName),
      sickLeave: parseSickLeave(obj.sickLeave)
    };
    return newOccupationalHealthcarEntry; 
    default:
      throw new Error('Incorrect or missing fields');    
  }
});




