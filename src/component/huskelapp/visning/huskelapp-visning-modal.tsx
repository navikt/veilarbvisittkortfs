import './huskelapp-visning.less';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Button, Modal } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';
import HuskelappIkon from '../ikon/huskelapp.svg?react';
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

    if (!huskelapp) {
        /* TODO Burde vi heller vise ei ordentleg feilmelding til frontend om det ikkje er nokon huskelapp å vise?
         *      Dette skal i teorien ikke kunne skje fordi vi sjekker hvilken modal som skal vises basert på
         *      om vi har huskelapp eller ikke. */

        // eslint-disable-next-line no-console
        console.warn('Oisann, her prøver noen å åpne huskelapp uten at det finnes noen huskelapp å åpne.');
        return null;
    }

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
                <div className="huskelapp-innhold huskelapp-effekt-styling">
                    <BodyShort size="small" weight={'semibold'}>
                        {huskelapp.frist ? `Frist: ${toSimpleDateStr(huskelapp!.frist!)}` : 'Ingen frist satt'}
                    </BodyShort>
                    {huskelapp.kommentar && <BodyShort size="small">{huskelapp.kommentar}</BodyShort>}
                    {huskelapp.endretDato && (
                        <BodyShort size="small">
                            <i>
                                Endret {toSimpleDateStr(huskelapp.endretDato)} av {huskelapp.endretAv}
                            </i>
                        </BodyShort>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={endreHuskelappKlikk} size="small" variant="primary" form="huskelapp-form">
                    Endre
                </Button>
                <Button
                    onClick={showFjernHuskelappModal}
                    icon={<TrashIcon aria-hidden />}
                    size="small"
                    variant="secondary"
                    type="button"
                >
                    Slett
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HuskelappVisningModal;
