import '../huskelapp.less';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Modal } from '@navikt/ds-react';
import React from 'react';
import HuskelappIkon from '../ikon/huskelapp.svg?react';
import { HuskelappFooter } from './huskelapp-footer';
import { useDataStore } from '../../../store/data-store';
import { toSimpleDateStr } from '../../../util/date-utils';
import { trackAmplitude } from '../../../amplitude/amplitude';

function HuskelappVisningModal() {
    const { hideModal, showHuskelappRedigereModal, showFjernHuskelappModal } = useModalStore();
    const { huskelapp } = useDataStore();

    const endreHuskelappKlikk = () => {
        trackAmplitude({
            name: 'knapp klikket',
            data: { knapptekst: 'Endre huskelapp', effekt: 'Åpne endre huskelapp-modal for bruker' }
        });
        showHuskelappRedigereModal();
    };

    return (
        <Modal
            header={{
                icon: <HuskelappIkon aria-hidden />,
                heading: 'Huskelapp',
                size: 'small'
            }}
            open={true}
            onClose={() => hideModal()}
        >
            <Modal.Body>
                <div className="huskelapp-visning">
                    <BodyShort as="div" size="small" weight={'semibold'}>
                        {huskelapp?.frist ? `Frist: ${toSimpleDateStr(huskelapp!.frist!)}` : 'Ingen frist satt'}
                    </BodyShort>
                    <BodyShort as="div" size="small">
                        {huskelapp!.kommentar}
                    </BodyShort>
                    <BodyShort as="div" size="small">
                        <i>
                            Endret {toSimpleDateStr(huskelapp!.endretDato!)} av {huskelapp!.endretAv}
                        </i>
                    </BodyShort>
                </div>
                <HuskelappFooter
                    endreHuskelapp={endreHuskelappKlikk}
                    onRequestClose={() => hideModal()}
                    slettHuskelapp={() => showFjernHuskelappModal()}
                />
            </Modal.Body>
        </Modal>
    );
}

export default HuskelappVisningModal;
