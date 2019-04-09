// tslint:disable object-literal-sort-keys
import { JSONValue } from 'yet-another-fetch-mock';
import { Oppfolging } from '../types/oppfolging';

const oppfolging: Oppfolging & JSONValue = {
    fnr: '123456',
    veilederId: 'Z007',
    reservasjonKRR: false,
    manuell: false,
    underOppfolging: true,
    underKvp: false,
    oppfolgingUtgang: '2019-03-28T11:12:40.973+01:00',
    gjeldendeEskaleringsvarsel: null,
    kanStarteOppfolging: false,
    avslutningStatus: null,
    oppfolgingsPerioder: [{
        'aktorId': '00007',
        'veileder': null,
        'startDato': '2017-12-02T18:37:24.717+01:00',
        'sluttDato': '2019-03-28T11:12:40.973+01:00',
        'begrunnelse': 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
        'kvpPerioder': []
    }],
    harSkriveTilgang: true,
    inaktivIArena: true,
    kanReaktiveres: false,
    inaktiveringsdato: '2019-02-22T00:00:00+01:00',
    erSykmeldtMedArbeidsgiver: false,
    erIkkeArbeidssokerUtenOppfolging: false
};
export default oppfolging;