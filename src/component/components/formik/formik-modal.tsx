import React, { useState } from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import cls from 'classnames';
import { Formik, FormikProps } from 'formik';
import ModalHeader from '../modal/modal-header';
import { useModalStore } from '../../../store/modal-store';

interface FormikModalProps<Values> {
    initialValues: Values;
    handleSubmit: (values: Values) => void;
    validationSchema?: (values: Values) => void;
    className?: string;
    contentLabel: string;
    render: (formikProps: FormikProps<Values>) => React.ReactNode;
    tilbakeTekst?: string;
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
        <Formik
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={values => props.handleSubmit(values)}
        >
            {formikProps => (
                <NavFrontendModal
                    className={cls('modal', props.className)}
                    contentLabel={props.contentLabel}
                    isOpen={props.isOpen || isOpen}
                    onRequestClose={() => tilbake(formikProps)}
                    closeButton={true}
                    portalClassName="visittkortfs-modal"
                >
                    <ModalHeader tittel={props.tittel} />
                    {props.render(formikProps)}
                </NavFrontendModal>
            )}
        </Formik>
    );
}

export default FormikModal;
