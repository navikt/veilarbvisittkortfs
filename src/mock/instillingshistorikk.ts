import { InnstillingsHistorikk } from '../types/innstillings-historikk';
import { JSONValue } from 'yet-another-fetch-mock';

const innstillingsHistorikk: InnstillingsHistorikk[] & JSONValue = [{
    'type': 'SATT_TIL_DIGITAL',
    'dato': '2019-03-14T11:44:23.29+01:00',
    'begrunnelse': 'ggfdgdf',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'Z007',
    'dialogId': null
}, {
    'type': 'SATT_TIL_MANUELL',
    'dato': '2019-03-14T10:42:15.897+01:00',
    'begrunnelse': 'test',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'Z007',
    'dialogId': null
}];

export default innstillingsHistorikk;