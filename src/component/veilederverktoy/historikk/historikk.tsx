import React, { useEffect } from 'react';
import HistorikkVisning from './historikk-visning';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useAppStore } from '../../../store/app-store';
import { hasAllData, hasAnyFailed, isAnyLoading } from '../../../api/utils';
import './historikk.less';
import { fetchOppgaveHistorikk, OppgaveHistorikkInnslag } from '../../../api/veilarboppgave';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { fetchInstillingsHistorikk, InnstillingHistorikkInnslag } from '../../../api/veilarboppfolging';
import { EskaleringsvarselHistorikkInnslag, hentEskaleringsvarselHistorikk } from '../../../api/veilarbdialog';
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
    const { brukerFnr } = useAppStore();

    const innstillingsHistorikkFetcher = useAxiosFetcher(fetchInstillingsHistorikk);
    const oppgaveHistorikkFetcher = useAxiosFetcher(fetchOppgaveHistorikk);
    const eskaleringsvarselHistorikkFetcher = useAxiosFetcher(hentEskaleringsvarselHistorikk);

    const {
        fetch: hentVeilederDataListe,
        data: veilederDataListeData,
        loading: veilederDataListeLoading
    } = useAxiosFetcher(fetchVeilederDataListe);

    useEffect(() => {
        innstillingsHistorikkFetcher.fetch(brukerFnr);
        oppgaveHistorikkFetcher.fetch(brukerFnr);
        eskaleringsvarselHistorikkFetcher.fetch(brukerFnr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    useEffect(() => {
        const skalHenteVeilederDataListe =
            !isAnyLoading(innstillingsHistorikkFetcher, oppgaveHistorikkFetcher, eskaleringsvarselHistorikkFetcher) &&
            hasAllData(innstillingsHistorikkFetcher, oppgaveHistorikkFetcher, eskaleringsvarselHistorikkFetcher);

        if (skalHenteVeilederDataListe) {
            const veilederIdentListe = filterUnique([
                ...tilIdentListe(
                    innstillingsHistorikkFetcher.data,
                    (ihi: InnstillingHistorikkInnslag) => ihi.opprettetAvBrukerId,
                    (ihi: InnstillingHistorikkInnslag) => ihi.opprettetAv === 'NAV'
                ),
                ...tilIdentListe(
                    oppgaveHistorikkFetcher.data,
                    (ohi: OppgaveHistorikkInnslag) => ohi.opprettetAvBrukerId,
                    (ohi: OppgaveHistorikkInnslag) => ohi.opprettetAv === 'NAV'
                ),
                ...tilIdentListe(
                    eskaleringsvarselHistorikkFetcher.data,
                    (evhi: EskaleringsvarselHistorikkInnslag) => evhi.opprettetAv,
                    (evhi: EskaleringsvarselHistorikkInnslag) => /^[A-Z]\d{6}$/.test(evhi.opprettetAv)
                ),
                ...tilIdentListe(
                    eskaleringsvarselHistorikkFetcher.data,
                    (evhi: EskaleringsvarselHistorikkInnslag) => evhi.avsluttetAv,
                    (evhi: EskaleringsvarselHistorikkInnslag) => /^[A-Z]\d{6}$/.test(evhi.avsluttetAv ?? '')
                )
            ]);

            if (isNonEmptyArray(veilederIdentListe)) {
                hentVeilederDataListe({ identer: veilederIdentListe });
            }
        }
    }, [
        innstillingsHistorikkFetcher,
        oppgaveHistorikkFetcher,
        eskaleringsvarselHistorikkFetcher,
        hentVeilederDataListe
    ]);

    if (
        isAnyLoading(innstillingsHistorikkFetcher, oppgaveHistorikkFetcher, eskaleringsvarselHistorikkFetcher) ||
        veilederDataListeLoading
    ) {
        return <LasterModal />;
    } else if (hasAnyFailed(innstillingsHistorikkFetcher, oppgaveHistorikkFetcher, eskaleringsvarselHistorikkFetcher)) {
        return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
    } else if (
        !innstillingsHistorikkFetcher.data &&
        !oppgaveHistorikkFetcher.data &&
        !eskaleringsvarselHistorikkFetcher.data
    ) {
        return null;
    }

    const innstillingHistorikk =
        innstillingsHistorikkFetcher.data?.map(ih => {
            return {
                ...ih,
                opprettetAvBrukerNavn: veilederDataListeData?.find(vd => ih.opprettetAvBrukerId === vd.ident)?.navn
            };
        }) || [];

    const oppgaveHistorikk =
        oppgaveHistorikkFetcher.data?.map(ih => {
            return {
                ...ih,
                opprettetAvBrukerNavn: veilederDataListeData?.find(vd => ih.opprettetAvBrukerId === vd.ident)?.navn
            };
        }) || [];

    const eskaleringsvarselHistorikk =
        eskaleringsvarselHistorikkTilEvent(eskaleringsvarselHistorikkFetcher.data)?.map(evhi => {
            return {
                ...evhi,
                opprettetAvBrukerNavn: veilederDataListeData?.find(vd => evhi.opprettetAv === vd.ident)?.navn,
                avsluttetAvBrukerNavn: veilederDataListeData?.find(vd => evhi.avsluttetAv === vd.ident)?.navn
            };
        }) || [];

    return (
        <VeilederVerktoyModal className="historikk__modal" tittel="Historikk">
            <div className="prosess blokk-s">
                <HistorikkVisning
                    innstillingHistorikk={innstillingHistorikk}
                    oppgaveHistorikk={oppgaveHistorikk}
                    eskaleringsvarselHistorikk={eskaleringsvarselHistorikk}
                />
            </div>
        </VeilederVerktoyModal>
    );
}

export default Historikk;
