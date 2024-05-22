import './huskelapp-visning.less';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Button, Detail, Heading, Modal } from '@navikt/ds-react';
import HuskelappIkon from '../ikon/huskelapp.svg?react';
import { useDataStore } from '../../../store/data-store';
import { toSimpleDateStr } from '../../../util/date-utils';
import { trackAmplitude } from '../../../amplitude/amplitude';
import { SlettHuskelapp } from '../redigering/slett-huskelapp';

function HuskelappVisningModal() {
    const { hideModal, showHuskelappRedigereModal } = useModalStore();
    const { huskelapp } = useDataStore();

    const endreHuskelappKlikk = () => {
        trackAmplitude({
            name: 'knapp klikket',
            data: { knapptekst: 'Endre huskelapp', effekt: 'Åpne endre huskelapp-modal for bruker' }
        });
        showHuskelappRedigereModal();
    };

    /* TODO Burde vi ha noko ordentleg feilhandtering her i staden for berre å ikkje vise noko
     *   dersom vi manglar huskelapp?
     *  Dette skal i teorien ikkje kunne skje fordi vi sjekkar kva modal som skal visast basert på
     *   om vi har huskelapp eller ikkje  */
    if (!huskelapp) {
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
            closeOnBackdropClick={true}
        >
            <Modal.Body className="huskelapp-visning-modal-body">
                <div className="huskelapp-innhold huskelapp-effekt-styling">
                    <Heading level="2" size="xsmall" spacing>
                        {huskelapp.frist ? `Frist: ${toSimpleDateStr(huskelapp!.frist!)}` : 'Ingen frist satt'}
                    </Heading>
                    {huskelapp.kommentar && <BodyShort size="small">{huskelapp.kommentar}</BodyShort>}
                </div>
                {huskelapp.endretDato && (
                    <Detail className="huskelapp-visning-modal__endret-av">
                        <i>
                            Endret {toSimpleDateStr(huskelapp.endretDato)} av {huskelapp.endretAv}
                        </i>
                    </Detail>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={endreHuskelappKlikk} size="small" variant="primary" form="huskelapp-form">
                    Endre
                </Button>
                <SlettHuskelapp />
            </Modal.Footer>
        </Modal>
    );
}

export default HuskelappVisningModal;
