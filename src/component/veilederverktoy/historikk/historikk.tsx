import { useMemo } from 'react';
import HistorikkVisning from './historikk-visning';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { Alert } from '@navikt/ds-react';
import { useBrukerFnr } from '../../../store/app-store';
import './historikk.less';
import { useOppgaveHistorikk } from '../../../api/veilarboppgave';
import { useInnstillingsHistorikk } from '../../../api/veilarboppfolging';
import { EskaleringsvarselHistorikkInnslag, useEskaleringsvarselHistorikk } from '../../../api/veilarbdialog';
import { useVeilederDataListe } from '../../../api/veilarbveileder';
import { isNonEmptyArray } from '../../../util/type/type-guards';
import { getVeilederIdents } from './getIdents';
import { hentAlleKontor } from '../../../api/ao-oppfolgingskontor';
import useSWR from 'swr';

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

function Historikk() {
    const brukerFnr = useBrukerFnr();

    const { innstillingsHistorikkData, innstillingsHistorikkLoading, innstillingsHistorikkError } =
        useInnstillingsHistorikk(brukerFnr);
    const { oppgaveHistorikkData, oppgaveHistorikkLoading, oppgaveHistorikkError } = useOppgaveHistorikk(brukerFnr);
    const { eskaleringsvarselHistorikkData, eskaleringsvarselHistorikkError, eskaleringsvarselHistorikkLoading } =
        useEskaleringsvarselHistorikk(brukerFnr);

    const {
        data: alleKontorData,
        error: kontorHistorikkError,
        isLoading: kontorHistorikkLoading
    } = useSWR(brukerFnr ? `/kontorer/${brukerFnr}` : null, () => hentAlleKontor(brukerFnr as string));

    const kontorHistorikkData = (alleKontorData?.data?.data?.kontorHistorikk || []).filter(
        ke => ke.kontorType === 'ARBEIDSOPPFOLGING'
    );

    const veilederIdenter = useMemo(() => {
        if (innstillingsHistorikkData && oppgaveHistorikkData && eskaleringsvarselHistorikkData) {
            const identer = getVeilederIdents({
                innstillingsHistorikkData,
                oppgaveHistorikkData,
                eskaleringsvarselHistorikkData,
                kontorEndringHistorikkData: kontorHistorikkData
            });
            return isNonEmptyArray(identer) ? identer : null;
        }
        return null;
    }, [innstillingsHistorikkData, oppgaveHistorikkData, eskaleringsvarselHistorikkData, kontorHistorikkData]);

    const { veilederListeData, veilederListeLoading } = useVeilederDataListe(veilederIdenter);

    const isLoading =
        innstillingsHistorikkLoading ||
        oppgaveHistorikkLoading ||
        eskaleringsvarselHistorikkLoading ||
        kontorHistorikkLoading ||
        veilederListeLoading;

    if (
        innstillingsHistorikkError ||
        oppgaveHistorikkError ||
        eskaleringsvarselHistorikkError ||
        kontorHistorikkError
    ) {
        return <Alert variant="error">Noe gikk galt</Alert>;
    }

    const innstillingHistorikk =
        innstillingsHistorikkData
            ?.filter(ih => ih.type !== 'OPPFOLGINGSENHET_ENDRET')
            .map(ih => {
                return {
                    ...ih,
                    opprettetAvBrukerNavn: veilederListeData?.find(vd => ih.opprettetAvBrukerId === vd.ident)?.navn,
                    tildeltVeilederNavn: veilederListeData?.find(vd => ih.tildeltVeilederId === vd.ident)?.navn
                };
            }) || [];

    const oppgaveHistorikk =
        oppgaveHistorikkData?.map(ih => {
            return {
                ...ih,
                opprettetAvBrukerNavn: veilederListeData?.find(vd => ih.opprettetAvBrukerId === vd.ident)?.navn
            };
        }) || [];

    const eskaleringsvarselHistorikk =
        eskaleringsvarselHistorikkTilEvent(eskaleringsvarselHistorikkData)?.map(evhi => {
            return {
                ...evhi,
                opprettetAvBrukerNavn: veilederListeData?.find(vd => evhi.opprettetAv === vd.ident)?.navn,
                avsluttetAvBrukerNavn: veilederListeData?.find(vd => evhi.avsluttetAv === vd.ident)?.navn
            };
        }) || [];

    const kontorEndringHistorikk = kontorHistorikkData.map((ke, idx) => {
        const forrigeKontor = kontorHistorikkData[idx + 1];
        return {
            ...ke,
            fraKontorId: forrigeKontor?.kontorId,
            fraKontorNavn: forrigeKontor?.kontorNavn,
            endretAvBrukerNavn:
                ke.endretAvType === 'VEILEDER'
                    ? veilederListeData?.find(vd => ke.endretAv === vd.ident)?.navn
                    : undefined
        };
    });

    return (
        <VeilederVerktoyModal className="historikk__modal" tittel="Historikk">
            <div className="prosess">
                <HistorikkVisning
                    isLoading={isLoading}
                    innstillingHistorikk={innstillingHistorikk}
                    oppgaveHistorikk={oppgaveHistorikk}
                    eskaleringsvarselHistorikk={eskaleringsvarselHistorikk}
                    kontorEndringHistorikk={kontorEndringHistorikk}
                />
            </div>
        </VeilederVerktoyModal>
    );
}

export default Historikk;
