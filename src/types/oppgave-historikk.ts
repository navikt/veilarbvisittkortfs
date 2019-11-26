import { OppgaveTema, OppgaveType } from './oppgave';

export interface OppgaveHistorikk {
    type: 'OPPRETTET_OPPGAVE';
    oppgaveTema: OppgaveTema;
    oppgaveType: OppgaveType;
    opprettetAv: 'NAV';
    opprettetAvBrukerId: string;
    dato: string; //OPPRETTET DATO
}
