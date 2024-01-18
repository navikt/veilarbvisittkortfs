import '../huskelapp.less';
import { Heading, Modal } from '@navikt/ds-react';
import React from 'react';
import { ReactComponent as HuskelappIkon } from '../ikon/huskelapp.svg';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import { EksisterendeArbeidsliste } from '../eksisterendeArbeidsliste';
import { HuskelappFooter } from '../huskelapp-footer';
import { trackAmplitude } from '../../../amplitude/amplitude';

function HuskelappMedArbeidslisteVisningModal() {
    const { hideModal, showHuskelappRedigereMedArbeidslisteModal } = useModalStore();

    const { arbeidsliste } = useDataStore();

    const lagHuskelappKlikk = () => {
        trackAmplitude({
            name: 'knapp klikket',
            data: { knapptekst: 'Lag huskelapp', effekt: 'Åpne lag huskelapp-modal for bruker' }
        });
        showHuskelappRedigereMedArbeidslisteModal();
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
            width={'800px'}
        >
            <Modal.Body>
                <div className={'huskelappmodal-med-arbeidsliste-innhold'}>
                    <div className={'huskelapp-innhold'}>
                        <Heading size={'medium'} visuallyHidden={true}>
                            Huskelappinnhold
                        </Heading>
                        <HuskelappInformasjonsmelding />
                    </div>
                    <EksisterendeArbeidsliste arbeidsliste={arbeidsliste} visFjernKnapp={true} />
                </div>
                <HuskelappFooter typePrimaryBtn="button" textPrimaryBtn="Lag huskelapp" onActionClick={lagHuskelappKlikk}  onRequestClose={() => hideModal()} />
            </Modal.Body>
        </Modal>
    );
}

export default HuskelappMedArbeidslisteVisningModal;
