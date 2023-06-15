import React, { useEffect } from 'react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AvsluttOppfolgingInfoText } from './components/avslutt-oppfolging-info-text';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import dayjs from 'dayjs';
import { useAppStore } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { selectHarUbehandledeDialoger } from '../../../util/selectors';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import { fetchDialoger } from '../../../api/veilarbdialog';
import { VEDTAKSSTTOTTE_PRELANSERING_TOGGLE } from '../../../api/veilarbpersonflatefs';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { fetchAvsluttOppfolgingStatus } from '../../../api/veilarboppfolging';
import { isAnyLoading } from '../../../api/utils';
import { logMetrikk } from '../../../util/logger';

const for28dagerSiden = dayjs().subtract(28, 'day').toISOString();

function AvsluttOppfolging() {
    const { brukerFnr, avsluttOppfolgingOpptelt, setAvsluttOppfolgingOpptelt } = useAppStore();
    const { features } = useDataStore();
    const { showtAvsluttOppfolgingBekrefModal: showAvsluttOppfolgingBekrefModal, hideModal } = useModalStore();

    const avsluttOppfolgingFetcher = useAxiosFetcher(fetchAvsluttOppfolgingStatus);
    const dialogFetcher = useAxiosFetcher(fetchDialoger);

    const avslutningStatus = avsluttOppfolgingFetcher.data;
    const datoErInnenFor28DagerSiden = (avslutningStatus?.inaktiveringsDato || 0) > for28dagerSiden;
    const harUbehandledeDialoger = dialogFetcher.data ? selectHarUbehandledeDialoger(dialogFetcher.data) : false;

    function handleSubmitAvsluttOppfolging(values: BegrunnelseValues) {
        showAvsluttOppfolgingBekrefModal({ begrunnelse: values.begrunnelse });
    }

    useEffect(() => {
        dialogFetcher.fetch(brukerFnr);
        avsluttOppfolgingFetcher.fetch(brukerFnr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    if (isAnyLoading(dialogFetcher, avsluttOppfolgingFetcher)) {
        return <LasterModal />;
    }

    if (!avslutningStatus?.kanAvslutte) {
        if (avslutningStatus?.kanAvslutte !== undefined && avslutningStatus?.kanAvslutte !== null) {
            if (!avsluttOppfolgingOpptelt) {
                logMetrikk(`veilarbvisittkortfs.metrikker.Avslutt_oppfolging_ikke_mulig`);
                setAvsluttOppfolgingOpptelt(true);
            }
        }
        return (
            <VarselModal
                contentLabel="Oppfølgingsperioden for brukeren kan ikke avsluttes"
                isOpen={true}
                onRequestClose={hideModal}
                type="ADVARSEL"
            >
                Du kan ikke avslutte oppfølgingsperioden fordi:
                <ul className="avslutt-oppfolging__ul">
                    {(avslutningStatus?.underOppfolging || !avslutningStatus?.erIserv) && (
                        <li>Brukeren har aktiv status i Arena.</li>
                    )}
                    {avslutningStatus?.underKvp && <li>Brukeren deltar i på KVP. KVP må avsluttes først.</li>}
                </ul>
            </VarselModal>
        );
    }

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: '' }}
            handleSubmit={handleSubmitAvsluttOppfolging}
            tekstariaLabel="Begrunnelse"
            tittel="Avslutt oppfølgingsperioden"
            isLoading={false}
            infoTekst={
                <AvsluttOppfolgingInfoText
                    vedtaksstottePrelanseringEnabled={features[VEDTAKSSTTOTTE_PRELANSERING_TOGGLE]}
                    avslutningStatus={avslutningStatus}
                    datoErInnenFor28DagerSiden={datoErInnenFor28DagerSiden}
                    harUbehandledeDialoger={harUbehandledeDialoger}
                    fnr={brukerFnr}
                />
            }
        />
    );
}

export default AvsluttOppfolging;
