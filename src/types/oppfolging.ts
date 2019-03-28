import { StringOrNothing } from './utils/stringornothings';
import { OrNothing } from './utils/ornothing';
/* tslint:disable */

export interface EskaleringsVarsel {
    varselId: string;
    aktorId: string;
    oppretterAv: string;
    opprettetDato: string;
    avsluttetDato: StringOrNothing;
    tilhorendeDialogId:string;
}


export interface AvslutningStatus {
    harTiltak: boolean;
    harYtelser: boolean;
    inaktiveringsDato: StringOrNothing;
    kanAvslutte: boolean;
    underKvp: boolean;
    underOppfolging: boolean;
}


export interface Oppfolging {
    avslutningStatus: OrNothing<AvslutningStatus>;
    erIkkeArbeidssokerUtenOppfolging: boolean;
    erSykmeldtMedArbeidsgiver: OrNothing<boolean>;
    fnr: string;
    gjeldeneEskaleringsvarsel: OrNothing<EskaleringsVarsel>;
    harSkriveTilgang: boolean;
    inaktivtIArena: boolean;
    inaktiveringsdato: StringOrNothing;
    kanReaktiveras: OrNothing<boolean>;
    kanStarteOppfolging: boolean;
    manuell: boolean;
    oppfolgingUtgang: StringOrNothing;
    oppfolgingsPerioder: any[]; //TODO TYPESCIPT
    reservarsjonKRR: boolean;
    underKvp: boolean;
    underOppfolging: boolean;
    veilederId: StringOrNothing;
    vilkarMaBesvarel: boolean;
}