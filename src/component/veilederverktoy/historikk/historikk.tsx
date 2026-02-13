import { useEffect, useState } from 'react';
import HistorikkVisning from './historikk-visning';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { Alert } from '@navikt/ds-react';
import { useBrukerFnr } from '../../../store/app-store';
import './historikk.less';
import { getVeilederIdents } from './getIdents';
import { useOppgaveHistorikk } from '../../../api/veilarboppgave';
import { useInnstillingsHistorikk } from '../../../api/veilarboppfolging';
import { EskaleringsvarselHistorikkInnslag, useEskaleringsvarselHistorikk } from '../../../api/veilarbdialog';
import { useVeilederDataListe } from '../../../api/veilarbveileder';
import { isNonEmptyArray } from '../../../util/type/type-guards';

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
    const { oppgaveHistorikkData, oppgaveHistorikkLoaing, oppgaveHistorikkError } = useOppgaveHistorikk(brukerFnr);
    const { eskaleringsvarselHistorikkData, eskaleringsvarselHistorikkError, eskaleringsvarselHistorikkLoading } =
        useEskaleringsvarselHistorikk(brukerFnr);

    const [veilederIdenter, setVeilederIdenter] = useState<string[] | null>(null);
    const { veilederListeData, veilederListeLoading } = useVeilederDataListe(veilederIdenter);

    useEffect(() => {
        const skalHenteVeilederDataListe =
            !(innstillingsHistorikkLoading || oppgaveHistorikkLoaing || eskaleringsvarselHistorikkLoading) &&
            innstillingsHistorikkData &&
            oppgaveHistorikkData &&
            eskaleringsvarselHistorikkData;

        if (skalHenteVeilederDataListe) {
            const veilederIdentListe = getVeilederIdents({
                innstillingsHistorikkData,
                oppgaveHistorikkData,
                eskaleringsvarselHistorikkData
            });

            if (isNonEmptyArray(veilederIdentListe)) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setVeilederIdenter(veilederIdentListe);
            }
        }
    }, [
        innstillingsHistorikkData,
        oppgaveHistorikkData,
        eskaleringsvarselHistorikkData,
        innstillingsHistorikkLoading,
        oppgaveHistorikkLoaing,
        eskaleringsvarselHistorikkLoading
    ]);

    const isLoading =
        innstillingsHistorikkLoading ||
        oppgaveHistorikkLoaing ||
        eskaleringsvarselHistorikkLoading ||
        veilederListeLoading;

    if (innstillingsHistorikkError || oppgaveHistorikkError || eskaleringsvarselHistorikkError) {
        return <Alert variant="error">Noe gikk galt</Alert>;
    }

    const innstillingHistorikk =
        innstillingsHistorikkData?.map(ih => {
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
