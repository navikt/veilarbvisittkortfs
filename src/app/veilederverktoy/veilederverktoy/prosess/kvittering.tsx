import React from 'react';
import { FormattedMessage } from 'react-intl';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { OrNothing } from '../../../../types/utils/ornothing';
import VeilederVerktoyModal from '../veilederverktoy-modal';
import { Systemtittel } from 'nav-frontend-typografi';

interface OwnProps {
    tittelId: string;
    alertStripeTekstId: string;
    alertStripeTekstValues?: OrNothing<{ [key: string]: any}>;
}

type KvitteringProps = OwnProps;

function Kvittering({tittelId, alertStripeTekstId, alertStripeTekstValues}: KvitteringProps) {
    return (
        <VeilederVerktoyModal>
            <div className="blokk-xs">
                <Systemtittel>
                    <FormattedMessage id={tittelId} />
                </Systemtittel>
                <AlertStripeSuksess className="blokk-m">
                    <FormattedMessage
                        id={alertStripeTekstId}
                        values={alertStripeTekstValues ? alertStripeTekstValues : {}}
                    />
                </AlertStripeSuksess>
            </div>
        </VeilederVerktoyModal>
    );
}

export default Kvittering;