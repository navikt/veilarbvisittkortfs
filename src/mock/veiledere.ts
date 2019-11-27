import { JSONValue } from 'yet-another-fetch-mock';
import { VeilederData } from '../types/veilederdata';

const veilederData: VeilederData & JSONValue = {
    ident: 'Z007',
    navn: 'James Bond',
    fornavn: 'James',
    etternavn: 'Bond'
};

export default veilederData;
