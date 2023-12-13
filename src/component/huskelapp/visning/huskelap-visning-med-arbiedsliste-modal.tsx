import '../huskelapp.less';
import { Heading, Modal } from '@navikt/ds-react';
import React from 'react';
import { ReactComponent as HuskelappIkon } from '../ikon/huskelapp.svg';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import { EksisterendeArbeidsliste } from '../eksisterendeArbeidsliste';
import HuskelappMedArbeidslisteFooter from './huskelapp-med-arbeidsliste-footer';

function HuskelappMedArbiedslisteVisningModal() {
    const { hideModal, showHuskelappRedigereModal } = useModalStore();

    const { arbeidsliste } = useDataStore();

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
                        <Heading size={'medium'} visuallyHidden={true}>
                            Huskelappinnhold
                        </Heading>
                        <HuskelappInformasjonsmelding />
                    </div>
                    <div className={'arbeidslisteInnhold'}>
                        <EksisterendeArbeidsliste arbeidsliste={arbeidsliste} visFjernKnapp={true} />
                    </div>
                </div>
                <HuskelappMedArbeidslisteFooter
                    lagHuskelapp={() => showHuskelappRedigereModal()}
                    onRequestClose={() => hideModal()}
                />
            </Modal.Body>
        </Modal>
    );
}

export default HuskelappMedArbiedslisteVisningModal;
