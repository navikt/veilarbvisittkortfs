import React from 'react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { selectSammensattNavn } from '../../../util/selectors';
import { useAppStore } from '../../../store/app-store';
import { avsluttOppfolging } from '../../../api/veilarboppfolging';
import { Button } from '@navikt/ds-react';

export interface AvsluttOppfolgingBekreftelseModalProps {
    begrunnelse: string;
}

function AvsluttOppfolgingBekreft(props: AvsluttOppfolgingBekreftelseModalProps) {
    const { brukerFnr } = useAppStore();
    const { personalia, innloggetVeileder } = useDataStore();
    const { showAvsluttOppfolgingKvitteringModal, showSpinnerModal, showErrorModal, hideModal } = useModalStore();

    const brukerNavn = selectSammensattNavn(personalia);

    function handleSubmitAvsluttOppfolging() {
        showSpinnerModal();

        avsluttOppfolging(brukerFnr, props.begrunnelse, innloggetVeileder!.ident)
            .then(showAvsluttOppfolgingKvitteringModal)
            .catch(showErrorModal);
    }

    return (
        <VarselModal contentLabel="Bruker kan ikke varsles" onRequestClose={hideModal} isOpen={true} type="ADVARSEL">
            <Normaltekst>Er du sikker på at du vil avslutte oppfølgingsperioden til {brukerNavn}?</Normaltekst>
            <div className="modal-footer">
                <Button
                    variant="primary"
                    type="submit"
                    style={{ marginRight: '1rem' }}
                    onClick={handleSubmitAvsluttOppfolging}
                    spinner={false}
                >
                    Bekreft
                </Button>
                <Button variant="secondary" onClick={hideModal}>
                    Avbryt
                </Button>
            </div>
        </VarselModal>
    );
}

export default AvsluttOppfolgingBekreft;
