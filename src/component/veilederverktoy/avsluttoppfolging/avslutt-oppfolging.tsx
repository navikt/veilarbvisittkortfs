import dayjs from 'dayjs';
import { BodyShort, Modal } from '@navikt/ds-react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AvsluttOppfolgingInfoText } from './components/avslutt-oppfolging-info-text';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useAvsluttOppfolgingOpptelt, useSetAvsluttOppfolgingOpptelt } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { selectHarUbehandledeDialoger } from '../../../util/selectors';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import { useDialoger } from '../../../api/veilarbdialog';
import { useAvsluttOppfolgingStatus } from '../../../api/veilarboppfolging';
import { logMetrikk } from '../../../util/logger';

const for28dagerSiden = dayjs().subtract(28, 'day').toISOString();

function AvsluttOppfolging({ brukerFnr }: { brukerFnr: string }) {
    const avsluttOppfolgingOpptelt = useAvsluttOppfolgingOpptelt();
    const setAvsluttOppfolgingOpptelt = useSetAvsluttOppfolgingOpptelt();
    const { showtAvsluttOppfolgingBekrefModal: showAvsluttOppfolgingBekrefModal, hideModal } = useModalStore();

    const { avsluttOppfolgingStatus, avsluttOppfolgingStatusLoading } = useAvsluttOppfolgingStatus(brukerFnr);
    const { dialogerData, dialogerLoading } = useDialoger(brukerFnr);

    const datoErInnenFor28DagerSiden = (avsluttOppfolgingStatus?.inaktiveringsDato || 0) > for28dagerSiden;
    const harUbehandledeDialoger = dialogerData ? selectHarUbehandledeDialoger(dialogerData) : false;

    function handleSubmitAvsluttOppfolging(values: BegrunnelseValues) {
        showAvsluttOppfolgingBekrefModal({ begrunnelse: values.begrunnelse });
    }

    if (dialogerLoading || avsluttOppfolgingStatusLoading) {
        return <LasterModal />;
    }

    if (!avsluttOppfolgingStatus?.kanAvslutte) {
        if (avsluttOppfolgingStatus?.kanAvslutte !== undefined && avsluttOppfolgingStatus?.kanAvslutte !== null) {
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
                        {(avsluttOppfolgingStatus?.underOppfolging || !avsluttOppfolgingStatus?.erIserv) && (
                            <li>Brukeren har aktiv status i Arena.</li>
                        )}
                        {avsluttOppfolgingStatus?.harAktiveTiltaksdeltakelser && (
                            <li>Brukeren har aktive arbeidsmarkedstiltak.</li>
                        )}
                        {avsluttOppfolgingStatus?.underKvp && (
                            <li>Brukeren deltar i på KVP. KVP må avsluttes først.</li>
                        )}
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
