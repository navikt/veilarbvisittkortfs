import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import { HiddenIfFlatKnapp } from '../../components/hidden-if/hidden-if-knapp';
import React from 'react';

interface ArbeidslisteFooterProps {
    onRequestClose: () => void;
    spinner: boolean;
    slettArbeidsliste: () => void;
    kanFjerneArbeidsliste: boolean;
}

function ArbeidslisteFooter(props: ArbeidslisteFooterProps) {
    return (
        <div className="modal-footer">
            <Hovedknapp htmlType="submit" className="btn--mr1" spinner={props.spinner}>
                <FormattedMessage id="modal.knapp.lagre" />
            </Hovedknapp>
            <Knapp htmlType="button" onClick={props.onRequestClose}>
                <FormattedMessage id="modal.knapp.avbryt" />
            </Knapp>
            <HiddenIfFlatKnapp
                htmlType="button"
                hidden={!props.kanFjerneArbeidsliste}
                onClick={props.slettArbeidsliste}
                className="btn--ml10"
            >
                Slett
            </HiddenIfFlatKnapp>
        </div>
    );
}

export default ArbeidslisteFooter;