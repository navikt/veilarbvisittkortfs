import React from 'react';
import { FormattedMessage } from 'react-intl';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { OrNothing } from '../../../../types/utils/ornothing';
import VeilederVerktoyModal from '../veilederverktoy-modal';
import { Systemtittel } from 'nav-frontend-typografi';

interface KvitteringProps {
    tittelId: string;
    alertStripeTekstId: string;
    alertStripeTekstValues?: OrNothing<{ [key: string]: any}>;
    footer?: React.ReactNode;
}

function Kvittering({tittelId, alertStripeTekstId, alertStripeTekstValues, footer}: KvitteringProps) {
    return (
        <VeilederVerktoyModal>
            <div className="blokk-xs">
                <Systemtittel className="modal-info-tekst__undertekst">
                    <FormattedMessage id={tittelId} />
                </Systemtittel>
                <AlertStripeSuksess className="blokk-m">
                    <FormattedMessage
                        id={alertStripeTekstId}
                        values={alertStripeTekstValues ? alertStripeTekstValues : {}}
                    />
                </AlertStripeSuksess>
                {!!footer && (
                    <div className="kvittering-footer">
                        {footer}
                    </div>
                )}
            </div>
        </VeilederVerktoyModal>
    );
}

export default Kvittering;
