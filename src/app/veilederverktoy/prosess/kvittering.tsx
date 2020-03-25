import React from 'react';
import { FormattedMessage } from 'react-intl';
import { OrNothing } from '../../../types/utils/ornothing';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useDispatch } from 'react-redux';
import { navigerAction } from '../../../store/navigation/actions';

interface KvitteringProps {
    tittelId: string;
    alertStripeTekstId: string;
    alertStripeTekstValues?: OrNothing<{ [key: string]: any }>;
    footer?: React.ReactNode;
}

function Kvittering({ tittelId, alertStripeTekstId, alertStripeTekstValues, footer }: KvitteringProps) {
    const dispatch = useDispatch();

    return (
        <VarselModal
            isOpen={true}
            contentLabel="Vedlykkad operation"
            onRequestClose={() => dispatch(navigerAction(null))}
            type="SUCCESS"
        >
            <div className="blokk-xs">
                <Systemtittel className="modal-info-tekst__undertekst blokk-xs">
                    <FormattedMessage id={tittelId} />
                </Systemtittel>
                <Normaltekst className="blokk-xs">
                    <FormattedMessage
                        id={alertStripeTekstId}
                        values={alertStripeTekstValues ? alertStripeTekstValues : {}}
                    />
                </Normaltekst>
                {!!footer && <div className="kvittering-footer">{footer}</div>}
            </div>
        </VarselModal>
    );
}

export default Kvittering;