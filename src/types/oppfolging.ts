import {StringOrNothing} from "./utils/stringornothings";

export interface Oppfolging {
    avslutningStatus: StringOrNothing;
    erIkkeArbeidssokerUtenOppfolging:boolean;
    erSykmeldtMedArbeidsgiver:boolean;
    fnr:string;
    gjeldeneEskaleringsvarsel: StringOrNothing;
    harSkriveTilgang:boolean;
    inaktivtIArena:boolean;
    inaktiveringsdato: StringOrNothing;
    kanReaktiveras: boolean;
    kanStarteOppfolging:boolean;
    manuell: boolean;
    oppfolgingUtgang: StringOrNothing;
    oppfolgingsPerioder:any[];
    reservarsjonKRR:boolean;
    underKvp:boolean;
    underOppfolging:boolean;
    veilederId: StringOrNothing;
    vilkarMaBesvarel:boolean;
}