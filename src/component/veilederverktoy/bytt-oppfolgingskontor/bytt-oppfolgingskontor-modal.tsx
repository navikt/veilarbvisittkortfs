import FormikModal from '../../components/formik/formik-modal';
import { Heading } from '@navikt/ds-react';
import { Form } from 'formik';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { selectSammensattNavn } from '../../../util/selectors';
import ByttOppfolgingskontorForm from './bytt-oppfolgingskontor-form';
import { ArbeidsOppfolgingKontorDTO, settKontor } from '../../../api/ao-oppfolgingskontor';

function ByttOppfolgingskontorModal() {
    const { brukerFnr, enhetId } = useAppStore();
    const { personalia } = useDataStore();
    const { hideModal, showOpprettOppgaveKvitteringModal, showErrorModal, showSpinnerModal } = useModalStore();

    const navn = selectSammensattNavn(personalia);

    if (!enhetId) {
        return null;
    }

    const arbeidsOppfolgingKontorInitialValues: ArbeidsOppfolgingKontorDTO = {
        fnr: brukerFnr,
        kontorId: enhetId
    }

    function lagreOppfolgingskontor(formdata: ArbeidsOppfolgingKontorDTO) {
        showSpinnerModal();
        settKontor(formdata)
    }

    return (
        <FormikModal
            initialValues={arbeidsOppfolgingKontorInitialValues}
            handleSubmit={lagreOppfolgingskontor}
            tittel="Bytt oppfolgingskontor"
            className="bytt-oppfolgingskontor"
            render={formikProps => (
                <div>
                    <Heading
                        size="small"
                        level="2"
                        className="bytt-oppfolgingskontor__undertittel"
                    >{`Bytt oppfolgingskontor for ${navn}`}</Heading>
                    <Form>
                        <ByttOppfolgingskontorForm
                            fnr={brukerFnr}
                            kontorId={enhetId}
                            formikProps={formikProps}
                            tilbake={() => hideModal()}
                        />
                    </Form>
                </div>
            )}
        />
    );
}

export default ByttOppfolgingskontorModal;
