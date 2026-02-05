import { filterUnique } from '../../../util/utils';
import { InnstillingHistorikkInnslag } from '../../../api/veilarboppfolging';
import { OppgaveHistorikkInnslag } from '../../../api/veilarboppgave';
import { EskaleringsvarselHistorikkInnslag } from '../../../api/veilarbdialog';
import { StringOrNothing } from '../../../util/type/utility-types';
import { isNonEmptyArray } from '../../../util/type/type-guards';
import { isString } from 'formik';

type HistorikkInnslag = InnstillingHistorikkInnslag | OppgaveHistorikkInnslag | EskaleringsvarselHistorikkInnslag;

export const getVeilederIdents = ({
    innstillingsHistorikkData,
    oppgaveHistorikkData,
    eskaleringsvarselHistorikkData
}: {
    innstillingsHistorikkData: InnstillingHistorikkInnslag[];
    oppgaveHistorikkData: OppgaveHistorikkInnslag[];
    eskaleringsvarselHistorikkData: EskaleringsvarselHistorikkInnslag[];
}) =>
    filterUnique([
        ...tilIdentListe(
            innstillingsHistorikkData,
            (ihi: InnstillingHistorikkInnslag) => ihi.opprettetAvBrukerId,
            (ihi: InnstillingHistorikkInnslag) => ihi.opprettetAv === 'NAV'
        ),
        ...tilIdentListe(
            innstillingsHistorikkData,
            (ihi: InnstillingHistorikkInnslag) => ihi.tildeltVeilederId,
            (ihi: InnstillingHistorikkInnslag) => ihi.opprettetAv === 'NAV'
        ),
        ...tilIdentListe(
            oppgaveHistorikkData,
            (ohi: OppgaveHistorikkInnslag) => ohi.opprettetAvBrukerId,
            (ohi: OppgaveHistorikkInnslag) => ohi.opprettetAv === 'NAV'
        ),
        ...tilIdentListe(
            eskaleringsvarselHistorikkData,
            (evhi: EskaleringsvarselHistorikkInnslag) => evhi.opprettetAv,
            (evhi: EskaleringsvarselHistorikkInnslag) => /^[A-Z]\d{6}$/.test(evhi.opprettetAv)
        ),
        ...tilIdentListe(
            eskaleringsvarselHistorikkData,
            (evhi: EskaleringsvarselHistorikkInnslag) => evhi.avsluttetAv,
            (evhi: EskaleringsvarselHistorikkInnslag) => /^[A-Z]\d{6}$/.test(evhi.avsluttetAv ?? '')
        )
    ]);

function tilIdentListe(
    historikkInnslag: HistorikkInnslag[] | undefined,
    identMapper: (hi: HistorikkInnslag) => StringOrNothing,
    filter: (hi: HistorikkInnslag) => boolean
): string[] {
    if (isNonEmptyArray(historikkInnslag)) {
        return historikkInnslag.filter(filter).map(identMapper).filter(isString);
    }

    return [];
}
