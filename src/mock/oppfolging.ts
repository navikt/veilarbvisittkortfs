// tslint:disable object-literal-sort-keys
import { JSONValue } from 'yet-another-fetch-mock';
import { OppfolgingData } from '../types/oppfolgingsstatus';

const oppfolgingsstatus: OppfolgingData & JSONValue = {
    oppfolgingsenhet: {
        navn: 'NAV TestHeim',
        enhetId: '007'
    },
    veilederId: 'Z123456',
    formidlingsgruppe: 'ARBS',
    servicegruppe: 'BKART',
    hovedmaalkode: 'BEHOLDEA'
};
export default oppfolgingsstatus;
