import React, { useState } from 'react';
import cls from 'classnames';
import { Formik, FormikProps } from 'formik';
import { useModalStore } from '../../../store/modal-store';
import { Modal } from '@navikt/ds-react';

interface FormikModalProps<Values> {
    initialValues: Values;
    handleSubmit: (values: Values) => void;
    validationSchema?: (values: Values) => void;
    className?: string;
    render: (formikProps: FormikProps<Values>) => React.ReactNode;
    visConfirmDialog?: boolean;
    isOpen?: boolean;
    tittel?: string;
}

function FormikModal<Values>({ visConfirmDialog = true, ...props }: FormikModalProps<Values>) {
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
        <Formik<Values>
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={values => props.handleSubmit(values)}
        >
            {formikProps => (
                <Modal
                    className={cls('visittkortfs-modal', props.className)}
                    open={props.isOpen || isOpen}
                    onClose={() => tilbake(formikProps)}
                    closeOnBackdropClick={true}
                    header={{
                        heading: props.tittel ?? '',
                        closeButton: true
                    }}
                >
                    <Modal.Body>{props.render(formikProps)}</Modal.Body>
                </Modal>
            )}
        </Formik>
    );
}

export default FormikModal;
