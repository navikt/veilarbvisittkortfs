import FormikModal from '../../components/formik/formik-modal';
import { Heading } from '@navikt/ds-react';
import { Form } from 'formik';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { selectSammensattNavn } from '../../../util/selectors';
import ByttOppfolgingskontorForm from './bytt-oppfolgingskontor-form';

export interface ByttOppfolgingskontorFormValues {
    fnr: string;
    enhetId: string;
}

function ByttOppfolgingskontorModal() {
    const { brukerFnr, enhetId } = useAppStore();
    const { personalia } = useDataStore();
    const { hideModal, showOpprettOppgaveKvitteringModal, showErrorModal, showSpinnerModal } = useModalStore();

    const navn = selectSammensattNavn(personalia);

    const byttOppfolgingskontorInitialValues: ByttOppfolgingskontorFormValues = {
        fnr: brukerFnr,
        enhetId: enhetId ? enhetId : ''
    }

    function lagreOppfolgingskontor(formdata: ByttOppfolgingskontorFormValues) {
        showSpinnerModal();

    }

    return (
        <FormikModal
            initialValues={byttOppfolgingskontorInitialValues}
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
                            enhetId={enhetId ? enhetId : ''}
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
