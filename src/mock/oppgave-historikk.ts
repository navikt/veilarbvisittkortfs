import { JSONValue } from 'yet-another-fetch-mock';
import { OppgaveHistorikk } from '../types/oppgave-historikk';

const oppgavehistorikk: OppgaveHistorikk[] & JSONValue = [{
    'type': 'OPPRETTET_OPPGAVE',
    'oppgaveTema': 'DAGPENGER',
    'oppgaveType': 'VURDER_HENVENDELSE',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'Z990281',
    'dato': '2019-03-07T07:38:23.376+01:00'
}];

export default oppgavehistorikk;