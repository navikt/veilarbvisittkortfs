import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Element, Innholdstittel } from 'nav-frontend-typografi';
import { VarselModal } from '../components/varselmodal/varsel-modal';
import hiddenIf from '../components/hidden-if/hidden-if';
import { logEvent } from '../utils/frontend-logger';

interface FjernArbeidslisteModal {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (fnr: string) => void;
    fnr: string;
    navn: string;
}

function FjernArbeidslisteModal(props: FjernArbeidslisteModal) {
    return (
        <VarselModal
            contentLabel="Fjern fra arbeidslisten"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            type="ADVARSEL"
        >
            <div className="modal-info-tekst blokk-s">
                <Innholdstittel className="modal-info-tekst__overskrift blokk-s">Fjern fra arbeidsliste</Innholdstittel>
                <Element className="blokk-m">{`${props.navn}, ${props.fnr}`}</Element>
            </div>
            <div className="knapper">
                <Hovedknapp
                    htmlType="submit"
                    className="btn--mr1"
                    onClick={() => {
                        logEvent('visittkort.metrikker.fjern_arbeidsliste');
                        props.onSubmit(props.fnr);
                        props.onRequestClose();
                    }}
                >
                    Bekreft
                </Hovedknapp>
                <Knapp htmlType="button" onClick={props.onRequestClose}>
                    Avbryt
                </Knapp>
            </div>
        </VarselModal>
    );
}

export default hiddenIf(FjernArbeidslisteModal);
