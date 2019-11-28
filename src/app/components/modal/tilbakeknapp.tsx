/* eslint-disable no-restricted-globals */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { VenstreChevron } from 'nav-frontend-chevron';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface TilbakeknappProps {
    tilbake?: () => void;
    visConfirmDialog?: boolean;
    tekstId: string;
}

function Tilbakeknapp(props: TilbakeknappProps & InjectedIntlProps) {
    function tilbake(e: React.SyntheticEvent) {
        e.preventDefault();
        const dialogTekst = props.intl.formatMessage({
            id: 'modal-skjema.lukk-advarsel'
        });
        // eslint-disable-next-line no-alert
        if (!props.visConfirmDialog || confirm(dialogTekst)) {
            if (props.tilbake) {
                props.tilbake();
                return;
            }
        }
    }

    return (
        <button onClick={tilbake} className="tilbakeknapp">
            <VenstreChevron />
            <span className="tilbakeknapp-innhold__tekst">
                <FormattedMessage id={props.tekstId} />
            </span>
        </button>
    );
}

export default injectIntl(Tilbakeknapp);
