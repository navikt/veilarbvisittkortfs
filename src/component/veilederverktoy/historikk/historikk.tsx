import { useEffect } from 'react';
import HistorikkVisning from './historikk-visning';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { Alert } from '@navikt/ds-react';
import { useBrukerFnr } from '../../../store/app-store';
import './historikk.less';
import { OppgaveHistorikkInnslag, useOppgaveHistorikk } from '../../../api/veilarboppgave';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { InnstillingHistorikkInnslag, useInnstillingsHistorikk } from '../../../api/veilarboppfolging';
import { EskaleringsvarselHistorikkInnslag, useEskaleringsvarselHistorikk } from '../../../api/veilarbdialog';
import { fetchVeilederDataListe } from '../../../api/veilarbveileder';
import { isNonEmptyArray, isString } from '../../../util/type/type-guards';
import { StringOrNothing } from '../../../util/type/utility-types';
import { filterUnique } from '../../../util/utils';

type HistorikkInnslag = InnstillingHistorikkInnslag | OppgaveHistorikkInnslag | EskaleringsvarselHistorikkInnslag;

function eskaleringsvarselHistorikkTilEvent(
    historikk: EskaleringsvarselHistorikkInnslag[] | undefined
): EskaleringsvarselHistorikkInnslag[] {
    const eventHistorikk: EskaleringsvarselHistorikkInnslag[] = [];

    historikk?.forEach(h => {
        eventHistorikk.push({
            id: h.id,
            tilhorendeDialogId: h.tilhorendeDialogId,
            opprettetAv: h.opprettetAv,
            opprettetDato: h.opprettetDato,
            opprettetBegrunnelse: h.opprettetBegrunnelse,
            avsluttetDato: null,
            avsluttetAv: null,
            avsluttetBegrunnelse: null
        });

        if (h.avsluttetAv != null) {
            eventHistorikk.push({
                id: h.id,
                tilhorendeDialogId: h.tilhorendeDialogId,
                opprettetAv: h.opprettetAv,
                opprettetDato: h.opprettetDato,
                opprettetBegrunnelse: h.opprettetBegrunnelse,
                avsluttetDato: h.avsluttetDato,
                avsluttetAv: h.avsluttetAv,
                avsluttetBegrunnelse: h.avsluttetBegrunnelse
            });
        }
    });

    return eventHistorikk;
}

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

function Historikk() {
    const brukerFnr = useBrukerFnr();

    const { innstillingsHistorikkData, innstillingsHistorikkLoading, innstillingsHistorikkError } =
        useInnstillingsHistorikk(brukerFnr);
    const { oppgaveHistorikkData, oppgaveHistorikkLoaing, oppgaveHistorikkError } = useOppgaveHistorikk(brukerFnr);
    const { eskaleringsvarselHistorikkData, eskaleringsvarselHistorikkError, eskaleringsvarselHistorikkLoading } =
        useEskaleringsvarselHistorikk(brukerFnr);

    const {
        fetch: hentVeilederDataListe,
        data: veilederDataListeData,
        loading: veilederDataListeLoading
    } = useAxiosFetcher(fetchVeilederDataListe);

    useEffect(() => {
        const skalHenteVeilederDataListe =
            !(innstillingsHistorikkLoading || oppgaveHistorikkLoaing || eskaleringsvarselHistorikkLoading) &&
            innstillingsHistorikkData &&
            oppgaveHistorikkData &&
            eskaleringsvarselHistorikkData;

        if (skalHenteVeilederDataListe) {
            const veilederIdentListe = filterUnique([
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

            if (isNonEmptyArray(veilederIdentListe)) {
                hentVeilederDataListe({ identer: veilederIdentListe });
            }
        }
    }, [innstillingsHistorikkData, oppgaveHistorikkData, eskaleringsvarselHistorikkData, hentVeilederDataListe]);

    const isLoading =
        innstillingsHistorikkLoading ||
        oppgaveHistorikkLoaing ||
        eskaleringsvarselHistorikkLoading ||
        veilederDataListeLoading;

    if (innstillingsHistorikkError || oppgaveHistorikkError || eskaleringsvarselHistorikkError) {
        return <Alert variant="error">Noe gikk galt</Alert>;
    }

    const innstillingHistorikk =
        innstillingsHistorikkData?.map(ih => {
            return {
                ...ih,
                opprettetAvBrukerNavn: veilederDataListeData?.find(vd => ih.opprettetAvBrukerId === vd.ident)?.navn,
                tildeltVeilederNavn: veilederDataListeData?.find(vd => ih.tildeltVeilederId === vd.ident)?.navn
            };
        }) || [];

    const oppgaveHistorikk =
        oppgaveHistorikkData?.map(ih => {
            return {
                ...ih,
                opprettetAvBrukerNavn: veilederDataListeData?.find(vd => ih.opprettetAvBrukerId === vd.ident)?.navn
            };
        }) || [];

    const eskaleringsvarselHistorikk =
        eskaleringsvarselHistorikkTilEvent(eskaleringsvarselHistorikkData)?.map(evhi => {
            return {
                ...evhi,
                opprettetAvBrukerNavn: veilederDataListeData?.find(vd => evhi.opprettetAv === vd.ident)?.navn,
                avsluttetAvBrukerNavn: veilederDataListeData?.find(vd => evhi.avsluttetAv === vd.ident)?.navn
            };
        }) || [];

    return (
        <VeilederVerktoyModal className="historikk__modal" tittel="Historikk">
            <div className="prosess">
                <HistorikkVisning
                    isLoading={isLoading}
                    innstillingHistorikk={innstillingHistorikk}
                    oppgaveHistorikk={oppgaveHistorikk}
                    eskaleringsvarselHistorikk={eskaleringsvarselHistorikk}
                />
            </div>
        </VeilederVerktoyModal>
    );
}

export default Historikk;
