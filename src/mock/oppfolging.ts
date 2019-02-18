// tslint:disable object-literal-sort-keys
import { JSONValue } from 'yet-another-fetch-mock';
import { Oppfolging} from '../types/oppfolging';

const oppfolging: Oppfolging & JSONValue = {
    avslutningStatus: null,
    erIkkeArbeidssokerUtenOppfolging:false,
    erSykmeldtMedArbeidsgiver:false,
    fnr: "10108000398",
    gjeldeneEskaleringsvarsel: null,
    harSkriveTilgang:false,
    inaktivtIArena:false,
    inaktiveringsdato: null,
    kanReaktiveras: false,
    kanStarteOppfolging:false,
    manuell: false,
    oppfolgingUtgang: null,
    oppfolgingsPerioder:[],
    reservarsjonKRR:false,
    underKvp:false,
    underOppfolging:false,
    veilederId: null,
    vilkarMaBesvarel:false,
};
export default oppfolging;