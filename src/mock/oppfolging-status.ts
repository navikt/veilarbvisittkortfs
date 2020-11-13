import { JSONValue } from 'yet-another-fetch-mock';
import { OppfolgingStatus } from '../api/data/oppfolging-status';

const oppfolgingsstatus: OppfolgingStatus & JSONValue = {
    oppfolgingsenhet: {
        navn: 'NAV TestHeim',
        enhetId: '007',
    },
    veilederId: '',
    formidlingsgruppe: 'ARBS',
    servicegruppe: 'BKART',
    hovedmaalkode: 'BEHOLDEA',
};
export default oppfolgingsstatus;
