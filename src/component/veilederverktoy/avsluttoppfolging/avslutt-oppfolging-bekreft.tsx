import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { selectSammensattNavn } from '../../../util/selectors';
import { avsluttOppfolging } from '../../../api/api';
import { useAppStore } from '../../../store/app-store';

export interface AvsluttOppfolgingBekreftelseModalProps {
    begrunnelse: string;
}

function AvsluttOppfolgingBekreft(props: AvsluttOppfolgingBekreftelseModalProps) {
    const { brukerFnr } = useAppStore();
    const { personalia, innloggetVeileder } = useDataStore();
    const { showModal, showSpinnerModal, showErrorModal, hideModal } = useModalStore();

    const brukerNavn = selectSammensattNavn(personalia);

    function handleSubmitAvsluttOppfolging() {
        showSpinnerModal();

        avsluttOppfolging(brukerFnr, props.begrunnelse, innloggetVeileder.ident)
            .then(() => {
                showModal(ModalType.AVSLUTT_OPPFOLGING_KVITTERING);
            })
            .catch(showErrorModal);
    }

    return (
        <VarselModal contentLabel="Bruker kan ikke varsles" onRequestClose={hideModal} isOpen={true} type="ADVARSEL">
            <Normaltekst>Er du sikker på at du vil avslutte oppfølgingsperioden til {brukerNavn}?</Normaltekst>
            <div className="modal-footer">
                <Hovedknapp
                    htmlType="submit"
                    style={{ marginRight: '1rem' }}
                    onClick={handleSubmitAvsluttOppfolging}
                    spinner={false}
                >
                    Bekreft
                </Hovedknapp>
                <Knapp onClick={hideModal}>Avbryt</Knapp>
            </div>
        </VarselModal>
    );
}

export default AvsluttOppfolgingBekreft;
