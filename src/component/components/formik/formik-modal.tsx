import { ReactNode, useState } from 'react';
import cls from 'classnames';
import { Formik, FormikProps, FormikValues } from 'formik';
import { Modal } from '@navikt/ds-react';
import { useModalStore } from '../../../store/modal-store';

interface FormikModalProps<Values> {
    initialValues: Values;
    handleSubmit: (values: Values) => void;
    tittel: string;
    render: (formikProps: FormikProps<Values>) => ReactNode;
    visConfirmDialog?: boolean;
    className?: string;
}

function FormikModal<Values extends FormikValues>({
    initialValues,
    handleSubmit,
    tittel,
    render,
    visConfirmDialog = true,
    className
}: FormikModalProps<Values>) {
    const { hideModal } = useModalStore();
    const [isOpen, setIsOpen] = useState(true);

    const tilbake = (formikProps: FormikProps<Values>) => {
        const confirmTekst = 'Er du sikker på at du vil lukke siden? Ulagrede endringer vil da gå tapt.';

        if (formikProps.dirty) {
            if (visConfirmDialog && window.confirm(confirmTekst)) {
                setIsOpen(false);
                hideModal();
            }
            if (!visConfirmDialog) {
                setIsOpen(false);
                hideModal();
            }
        } else {
            setIsOpen(false);
            hideModal();
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={values => handleSubmit(values)}>
            {formikProps => (
                <Modal
                    className={cls('visittkortfs-modal', className)}
                    open={isOpen}
                    onClose={() => tilbake(formikProps)}
                    closeOnBackdropClick={true}
                    header={{
                        heading: tittel,
                        closeButton: true
                    }}
                >
                    <Modal.Body>{render(formikProps)}</Modal.Body>
                </Modal>
            )}
        </Formik>
    );
}

export default FormikModal;
