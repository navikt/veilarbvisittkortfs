import { JSONValue } from 'yet-another-fetch-mock';
import { VeilederData } from '../api/data/veilederdata';
import { EnhetData } from '../api/data/enhet';

const veilederData: VeilederData & JSONValue = {
    ident: 'Z007',
    navn: 'James Bond',
    fornavn: 'James',
    etternavn: 'Bond',
};

export const enhetData: EnhetData & JSONValue = {
    enhetId: '1337',
    navn: 'NAV Leeten',
};

export default veilederData;
