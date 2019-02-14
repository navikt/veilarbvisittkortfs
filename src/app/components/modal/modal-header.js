import React from 'react';
import PT from 'prop-types';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import Tilbakeknapp from './tilbakeknapp';

function ModalHeader({
    tilbakeTekstId,
    normalTekstId,
    tilbakeTekstValues,
    normalTekstValues,
    className,
    visConfirmDialog,
    aktivitetErLaast,
    intl,
    ...props
}) {
    return (
        <div
            className={classNames('modal-header-wrapper', className)}
            {...props}
        >
            {/* header til slutt for å få denne sist i tabrekkefølgen */}

            <header className="modal-header">
                {tilbakeTekstId &&
                    <Tilbakeknapp
                        tekstId={tilbakeTekstId}
                        tekstValues={tilbakeTekstValues}
                        visConfirmDialog={visConfirmDialog}
                    />}
                {normalTekstId &&
                    <Normaltekst tag="h1">
                        <FormattedMessage
                            id={normalTekstId}
                            values={normalTekstValues}
                        />
                    </Normaltekst>}
            </header>
        </div>
    );
}

ModalHeader.propTypes = {
    tilbakeTekstId: PT.string,
    tilbakeTekstValues: PT.object, // eslint-disable-line react/forbid-prop-types
    normalTekstId: PT.string,
    normalTekstValues: PT.object, // eslint-disable-line react/forbid-prop-types
    visConfirmDialog: PT.bool,
    className: PT.string,
    aktivitetErLaast: PT.bool,
    intl: intlShape.isRequired,
};

ModalHeader.defaultProps = {
    tilbakeTekstId: undefined,
    tilbakeTekstValues: undefined,
    normalTekstId: undefined,
    normalTekstValues: undefined,
    visConfirmDialog: false,
    className: undefined,
    aktivitetErLaast: false,
};

export default injectIntl(ModalHeader);
