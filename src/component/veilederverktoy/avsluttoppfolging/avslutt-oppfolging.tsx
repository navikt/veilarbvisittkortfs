import { useEffect } from 'react';
import dayjs from 'dayjs';
import { BodyShort, Modal } from '@navikt/ds-react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AvsluttOppfolgingInfoText } from './components/avslutt-oppfolging-info-text';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useAvsluttOppfolgingOpptelt, useBrukerFnr, useSetAvsluttOppfolgingOpptelt } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { selectHarUbehandledeDialoger } from '../../../util/selectors';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import { fetchDialoger } from '../../../api/veilarbdialog';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { fetchAvsluttOppfolgingStatus } from '../../../api/veilarboppfolging';
import { isAnyLoading } from '../../../api/utils';
import { logMetrikk } from '../../../util/logger';

const for28dagerSiden = dayjs().subtract(28, 'day').toISOString();

function AvsluttOppfolging() {
    const brukerFnr = useBrukerFnr();
    const avsluttOppfolgingOpptelt = useAvsluttOppfolgingOpptelt();
    const setAvsluttOppfolgingOpptelt = useSetAvsluttOppfolgingOpptelt();
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
        if (!brukerFnr) return;
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
            <VarselModal isOpen={true} onRequestClose={hideModal} type="ADVARSEL">
                <Modal.Body className="veilarbvisittkortfs-varsel-modal-body">
                    <BodyShort>Du kan ikke avslutte oppfølgingsperioden fordi:</BodyShort>
                    <ul>
                        {(avslutningStatus?.underOppfolging || !avslutningStatus?.erIserv) && (
                            <li>Brukeren har aktiv status i Arena.</li>
                        )}
                        {avslutningStatus?.harAktiveTiltaksdeltakelser && (
                            <li>Brukeren har aktive arbeidsmarkedstiltak.</li>
                        )}
                        {avslutningStatus?.underKvp && <li>Brukeren deltar i på KVP. KVP må avsluttes først.</li>}
                    </ul>
                </Modal.Body>
            </VarselModal>
        );
    }

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: '' }}
            handleSubmit={handleSubmitAvsluttOppfolging}
            tekstariaLabel="Begrunnelse"
            tittel="Avslutt oppfølgingsperioden"
            infoTekst={
                <AvsluttOppfolgingInfoText
                    datoErInnenFor28DagerSiden={datoErInnenFor28DagerSiden}
                    harUbehandledeDialoger={harUbehandledeDialoger}
                    fnr={brukerFnr}
                />
            }
            isLoading={false}
        />
    );
}

export default AvsluttOppfolging;
