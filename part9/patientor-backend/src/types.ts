export interface Diagnosis{
    code: string,
    name: string,
    latin?: string
}

export type NonSensitiveDiagnoseEntry = Omit<Diagnosis, 'latin'>;

export enum Gender{
    'male',
    'female',
    'other'
}


export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

export interface Discharge{
    date: string,
    criteria: string
}

export interface HospitalEntry extends BaseEntry{
    type: "Hospital",
    discharge: Discharge
}

export interface SickLeave{
    startDate: string,
    endDate: string
  }

export interface  OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: SickLeave

}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export interface Patient{
    id: string,
    name: string,
    ssn?: string,
    dateOfBirth: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;


 export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

 export type NewPatientEntry = Omit<Patient, 'id'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;  