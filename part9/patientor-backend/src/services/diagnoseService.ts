import diagnoses from '../../data/diagnoses';


import { Diagnosis, NonSensitiveDiagnoseEntry } from '../types';

const getEntries = (): Diagnosis[] => {
    return diagnoses;
};

const getNonSensitiveEntries  = (): NonSensitiveDiagnoseEntry[] => {
    return diagnoses.map(({code, name}) => ({code, name}));
};

export default {
    getEntries,
    getNonSensitiveEntries
};