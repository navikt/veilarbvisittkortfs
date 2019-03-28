// tslint:disable object-literal-sort-keys
import { JSONValue } from 'yet-another-fetch-mock';
import { Oppfolging } from '../types/oppfolging';

const oppfolging: Oppfolging & JSONValue = {
    avslutningStatus: null,
    erIkkeArbeidssokerUtenOppfolging: false,
    erSykmeldtMedArbeidsgiver: null,
    fnr: '10108000398',
    gjeldeneEskaleringsvarsel: null,
    harSkriveTilgang: false,
    inaktivtIArena: false,
    inaktiveringsdato: null,
    kanReaktiveras: null,
    kanStarteOppfolging: false,
    manuell: false,
    oppfolgingUtgang: null,
    oppfolgingsPerioder: [],
    reservasjonKRR: false,
    underKvp: false,
    underOppfolging: true,
    veilederId: null,
    vilkarMaBesvarel: false,
};
export default oppfolging;