import { StringOrNothing } from './utils/stringornothings';
import { OrNothing } from './utils/ornothing';
import {AvslutningStatus} from "./avslutningsstatus";
/* tslint:disable */

export interface EskaleringsVarsel {
    varselId: string;
    aktorId: string;
    oppretterAv: string;
    opprettetDato: string;
    avsluttetDato: StringOrNothing;
    tilhorendeDialogId:string;
}


export interface Oppfolging {
    avslutningStatus: OrNothing<AvslutningStatus>;
    erIkkeArbeidssokerUtenOppfolging: boolean;
    erSykmeldtMedArbeidsgiver: boolean;
    fnr: string;
    gjeldeneEskaleringsvarsel: OrNothing<EskaleringsVarsel>;
    harSkriveTilgang: boolean;
    inaktivtIArena: boolean;
    inaktiveringsdato: StringOrNothing;
    kanReaktiveras: boolean;
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