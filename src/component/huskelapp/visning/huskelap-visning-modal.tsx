import '../huskelapp.less';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Modal } from '@navikt/ds-react';
import React from 'react';
import { ReactComponent as HuskelappIkon } from '../ikon/huskelapp.svg';
import HuskelappFooter from './huskelapp-footer';
import { useDataStore } from '../../../store/data-store';
import { toReversedDateStr } from '../../../util/date-utils';

function HuskelappVisningModal() {
    const { hideModal, showHuskelappRedigereModal, showFjernHuskelappModal } = useModalStore();
    const { huskelapp } = useDataStore();
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
                <div className={'huskelappmodal-innhold'}>
                    <div className={'huskelapp-innhold'}>
                        <div className="huskelapp-visning">
                            <BodyShort as="div">
                                <div className="frist-info">Frist: {toReversedDateStr(huskelapp!.frist!)}</div>
                            </BodyShort>
                            <BodyShort as="div" size="small">
                                {huskelapp!.kommentar}
                            </BodyShort>
                            <BodyShort as="div" size="small">
                                <i>
                                    Endret {toReversedDateStr(huskelapp!.endretDato!)} av {huskelapp!.endretAv}
                                </i>
                            </BodyShort>
                        </div>
                    </div>
                </div>
                <HuskelappFooter
                    endreHuskelapp={() => showHuskelappRedigereModal()}
                    onRequestClose={() => hideModal()}
                    slettHuskelapp={() => showFjernHuskelappModal()}
                />
            </Modal.Body>
        </Modal>
    );
}

export default HuskelappVisningModal;
