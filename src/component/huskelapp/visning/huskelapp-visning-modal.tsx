import '../huskelapp.less';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Modal } from '@navikt/ds-react';
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
            <Modal.Body className="huskelapp-visning-modal-body">
                <div className="huskelapp-visning">
                    <BodyShort size="small" weight={'semibold'}>
                        {huskelapp?.frist ? `Frist: ${toSimpleDateStr(huskelapp!.frist!)}` : 'Ingen frist satt'}
                    </BodyShort>
                    <BodyShort size="small">{huskelapp!.kommentar}</BodyShort>
                    <BodyShort size="small">
                        <i>
                            Endret {toSimpleDateStr(huskelapp!.endretDato!)} av {huskelapp!.endretAv}
                        </i>
                    </BodyShort>
                </div>
            </Modal.Body>
            <HuskelappFooter
                endreHuskelapp={endreHuskelappKlikk}
                onRequestClose={() => hideModal()}
                slettHuskelapp={() => showFjernHuskelappModal()}
            />
        </Modal>
    );
}

export default HuskelappVisningModal;
