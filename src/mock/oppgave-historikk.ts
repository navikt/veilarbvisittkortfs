import { JSONValue } from 'yet-another-fetch-mock';
import { OppgaveHistorikk } from '../types/oppgave-historikk';

const oppgavehistorikk: OppgaveHistorikk[] & JSONValue = [{
    'type': 'OPPRETTET_OPPGAVE',
    'oppgaveTema': 'OPPFOLGING',
    'oppgaveType': 'VURDER_HENVENDELSE',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'Z995009',
    'dato': '2018-01-31T15:17:46.872+01:00'
}, {
    'type': 'OPPRETTET_OPPGAVE',
    'oppgaveTema': 'OPPFOLGING',
    'oppgaveType': 'VURDER_HENVENDELSE',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'Z990286',
    'dato': '2018-09-07T10:40:52.445+02:00'
}, {
    'type': 'OPPRETTET_OPPGAVE',
    'oppgaveTema': 'DAGPENGER',
    'oppgaveType': 'VURDER_HENVENDELSE',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'Z990286',
    'dato': '2018-09-07T10:43:19.348+02:00'
}, {
    'type': 'OPPRETTET_OPPGAVE',
    'oppgaveTema': 'INDIVIDSTONAD',
    'oppgaveType': 'VURDER_HENVENDELSE',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'Z990286',
    'dato': '2018-09-07T10:46:34.778+02:00'
}, {
    'type': 'OPPRETTET_OPPGAVE',
    'oppgaveTema': 'OPPFOLGING',
    'oppgaveType': 'VURDER_HENVENDELSE',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'Z990582',
    'dato': '2018-01-16T14:11:13.891+01:00'
}];

export default oppgavehistorikk;