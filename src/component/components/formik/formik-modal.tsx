import { ReactNode, useState } from 'react';
import cls from 'classnames';
import { Formik, FormikProps, FormikValues } from 'formik';
import { Modal } from '@navikt/ds-react';
import { useModalStore } from '../../../store/modal-store';

interface FormikModalProps<Values extends InitialValues, InitialValues> {
    initialValues: InitialValues;
    handleSubmit: (values: Values) => void;
    tittel: string;
    render: (formikProps: FormikProps<Values>) => ReactNode;
    visConfirmDialog?: boolean;
    className?: string;
}

function FormikModal<Values extends InitialValues, InitialValues extends FormikValues>({
    initialValues,
    handleSubmit,
    tittel,
    render,
    visConfirmDialog = true,
    className
}: FormikModalProps<Values, InitialValues>) {
    const { hideModal } = useModalStore();

    const tilbake = (formikProps: FormikProps<Values>) => {
        const confirmTekst = 'Er du sikker på at du vil lukke siden? Ulagrede endringer vil da gå tapt.';

        if (formikProps.dirty) {
            if (visConfirmDialog && window.confirm(confirmTekst)) {
                hideModal();
                return true;
            }
            if (!visConfirmDialog) {
                hideModal();
                return true;
            }
            return false;
        } else {
            hideModal();
            return true;
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={values => handleSubmit(values as Values)}>
            {formikProps => (
                <Modal
                    className={cls('visittkortfs-modal', className)}
                    open
                    onBeforeClose={() => tilbake(formikProps as FormikProps<Values>)}
                    closeOnBackdropClick={true}
                    onClose={() => {}}
                    header={{
                        heading: tittel,
                        closeButton: true
                    }}
                >
                    <Modal.Body>{render(formikProps as FormikProps<Values>)}</Modal.Body>
                </Modal>
            )}
        </Formik>
    );
}

export default FormikModal;
