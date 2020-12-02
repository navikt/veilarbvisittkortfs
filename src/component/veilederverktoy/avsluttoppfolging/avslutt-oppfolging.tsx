import React from 'react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AvsluttOppfolgingInfoText } from './components/avslutt-oppfolging-info-text';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import dayjs from 'dayjs';
import { useAppStore } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { selectHarUbehandledeDialoger } from '../../../util/selectors';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import { useFetchDialoger } from '../../../api/veilarbdialog';
import { VEDTAKSSTTOTTE_PRELANSERING_TOGGLE } from '../../../api/veilarbpersonflatefs';

const for28dagerSiden = dayjs().subtract(28, 'day').toISOString();

function AvsluttOppfolging() {
    const { brukerFnr } = useAppStore();
    const { oppfolging, features } = useDataStore();
    const { showtAvsluttOppfolgingBekrefModal, hideModal } = useModalStore();

    const fetchDialoger = useFetchDialoger(brukerFnr);

    const avslutningStatus = oppfolging.avslutningStatus;
    const datoErInnenFor28DagerSiden = (avslutningStatus?.inaktiveringsDato || 0) > for28dagerSiden;
    const harUbehandledeDialoger = fetchDialoger.data ? selectHarUbehandledeDialoger(fetchDialoger.data) : false;

    function handleSubmitAvsluttOppfolging(values: BegrunnelseValues) {
        showtAvsluttOppfolgingBekrefModal({ begrunnelse: values.begrunnelse });
    }

    if (fetchDialoger.loading) {
        return <LasterModal />;
    }

    if (!avslutningStatus?.kanAvslutte) {
        return (
            <VarselModal
                contentLabel="Oppfølgingsperioden før brukeren kan ikke avslutes"
                isOpen={true}
                onRequestClose={hideModal}
                type="ADVARSEL"
            >
                Du kan ikke avslutte oppfølgingsperioden fordi:
                <ul className="avslutt-oppfolging__ul">
                    {avslutningStatus?.underOppfolging && <li>Brukeren har aktiv status i Arena.</li>}
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
