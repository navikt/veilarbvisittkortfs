import FormikModal from '../../components/formik/formik-modal';
import { BodyShort, Heading, Label, Modal } from '@navikt/ds-react';
import { Form as FormikForm } from 'formik';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { selectSammensattNavn } from '../../../util/selectors';
import ByttOppfolgingskontorForm from './bytt-oppfolgingskontor-form';
import { ArbeidsOppfolgingKontorDTO, settKontor } from '../../../api/ao-oppfolgingskontor';
import './bytt-oppfolgingskontor.css';
import { ByttOppfolgingskontorKvittering, KontorSkiftetKvittering } from './bytt-oppfolgingskontor-kvittering';
import { useState } from 'react';

function ByttOppfolgingskontorModal() {
    const [kvittering, setKvittering] = useState<KontorSkiftetKvittering | undefined>(undefined);
    const { brukerFnr, enhetId } = useAppStore();
    const { personalia } = useDataStore();
    const { hideModal } = useModalStore();

    const navn = selectSammensattNavn(personalia);

    if (!enhetId) {
        return null;
    }

    const arbeidsOppfolgingKontorInitialValues: ArbeidsOppfolgingKontorDTO = {
        fnr: brukerFnr,
        kontorId: enhetId
    };

    async function lagreOppfolgingskontor(formdata: ArbeidsOppfolgingKontorDTO) {
        await settKontor(formdata);
        setKvittering({
            fraKontor: { kontorId: enhetId || '', navn: 'Ditt nåværende kontor' },
            tilKontor: { kontorId: formdata.kontorId, navn: 'Ditt nye kontor' }
        });
    }

    if (kvittering) {
        return (
            <Modal
                className="visittkortfs-modal"
                open
                onClose={hideModal}
                closeOnBackdropClick={true}
                header={{
                    heading: 'Bytt oppfølgingskontor',
                    closeButton: true
                }}
            >
                <Modal.Body>
                    <ByttOppfolgingskontorKvittering kvittering={kvittering} />
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <FormikModal
            initialValues={arbeidsOppfolgingKontorInitialValues}
            handleSubmit={lagreOppfolgingskontor}
            tittel="Bytt oppfølgingskontor"
            className="bytt-oppfolgingskontor"
            render={() => (
                <div className="bytt-oppfolgingskontor-modal space-y-4">
                    {/*<Heading size="small" level="2" className="mb-4">{`Bytt oppfølgingskontor for ${navn}`}</Heading>*/}
                    <div className="space-y-2 p-4 rounded-sm border-border-default bg-surface-subtle">
                        <div className="mb-2">
                            <Heading size={'small'}>Fakta om bruker</Heading>
                        </div>
                        <div className="flex space-x-2">
                            <Label>Navn:</Label>
                            <BodyShort>{navn}</BodyShort>
                        </div>
                        <div className="flex space-x-2">
                            <Label>Folkeregistrer addresse:</Label>
                            <BodyShort>Fyrstikkalleen 1</BodyShort>
                        </div>
                    </div>
                    <FormikForm>
                        <ByttOppfolgingskontorForm fnr={brukerFnr} tilbake={() => hideModal()} />
                    </FormikForm>
                </div>
            )}
        />
    );
}

export default ByttOppfolgingskontorModal;
