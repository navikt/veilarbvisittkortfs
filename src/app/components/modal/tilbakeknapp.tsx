/* eslint-disable no-restricted-globals */
import React from 'react';
import { FormattedMessage} from 'react-intl';
import { VenstreChevron } from 'nav-frontend-chevron';
import {Knapp} from 'nav-frontend-knapper';
import {injectIntl, InjectedIntlProps} from 'react-intl';

interface TilbakeknappProps {
    tilbake? : () => void;
    visConfirmDialog?: boolean;
    tekstId: string;
}

function Tilbakeknapp(props: TilbakeknappProps & InjectedIntlProps) {
    function tilbake(e: React.SyntheticEvent) {
        e.preventDefault();
        const dialogTekst = props.intl.formatMessage({
            id: 'modal-skjema.lukk-advarsel',
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
        <Knapp onClick={tilbake} className="tilbakeknapp">
            <div className="tilbakeknapp-innhold">
                <VenstreChevron />
                <span className="tilbakeknapp-innhold__tekst">
                    <FormattedMessage id={props.tekstId}/>
                </span>
            </div>
        </Knapp>
    );
}


export default injectIntl(Tilbakeknapp);
