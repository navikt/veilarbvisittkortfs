/* eslint-disable no-restricted-globals */
import React from 'react';
import {connect} from 'react-redux';
import PT from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { VenstreChevron } from 'nav-frontend-chevron';
import {Knapp} from 'nav-frontend-knapper';
import {navigerAction} from "../../../store/navigation/actions";

function Tilbakeknapp(props) {
    function tilbake(e) {
        e.preventDefault();
        const dialogTekst = props.intl.formatMessage({
            id: 'modal-skjema.lukk-advarsel',
        });
        // eslint-disable-next-line no-alert
        if (!props.visConfirmDialog || confirm(dialogTekst)) {
            props.goBack();
        }
    }

    return (
        <Knapp onClick={tilbake} className="tilbakeknapp">
            <div className="tilbakeknapp-innhold">
                <VenstreChevron />
                <span className="tilbakeknapp-innhold__tekst">
                    <FormattedMessage
                        id={props.tekstId}
                        values={props.tekstValues}
                    />
                </span>
            </div>
        </Knapp>
    );
}

Tilbakeknapp.defaultProps = {
    tekstValues: undefined,
    visConfirmDialog: false,
};

Tilbakeknapp.propTypes = {
    tekstId: PT.string.isRequired,
    tekstValues: PT.object, // eslint-disable-line react/forbid-prop-types
    visConfirmDialog: PT.bool,
    intl: intlShape.isRequired,
};

const mapDispatchToProps = (dispatch)=> ({
    goBack: ()=> dispatch(navigerAction('prosesser'))
});

export default connect(null, mapDispatchToProps)(injectIntl(Tilbakeknapp));
