// tslint:disable object-literal-sort-keys
import { JSONValue } from 'yet-another-fetch-mock';
import { OppfolgingStatus } from '../types/oppfolging-status';

const oppfolgingsstatus: OppfolgingStatus & JSONValue = {
    oppfolgingsenhet: {
        navn: 'NAV TestHeim',
        enhetId: '007'
    },
    veilederId: "Z007",
    formidlingsgruppe: 'ARBS',
    servicegruppe: 'BKART',
    hovedmaalkode: 'BEHOLDEA'
};
export default oppfolgingsstatus;
