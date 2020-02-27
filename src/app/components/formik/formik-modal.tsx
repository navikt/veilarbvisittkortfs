import NavFrontendModal from 'nav-frontend-modal';
import React, { useState } from 'react';
import classNames from 'classnames';
import { Formik, FormikProps } from 'formik';
import ModalHeader from '../modal/modal-header';
import { useDispatch } from 'react-redux';
import { navigerAction } from '../../../store/navigation/actions';

const cls = (className?: string) => classNames('modal', className);

interface FormikModalProps<Values> {
    initialValues: Values;
    handleSubmit: (values: Values) => void;
    validationSchema?: (values: Values) => void;
    className?: string;
    contentLabel: string;
    render: (formikProps: FormikProps<Values>) => React.ReactNode;

    tilbakeTekstId?: string;
    visConfirmDialog?: boolean;
    tilbake?: () => void;
    isOpen?: boolean;
}

function FormikModal<Values>({ visConfirmDialog = true, ...props }: FormikModalProps<Values>) {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();

    const tilbake = (formikProps: FormikProps<Values>) => {
        const confirmTekst = 'Er du sikker på at du vil lukke siden? Ulagrede endringer vil da gå tapt.';

        if (formikProps.dirty) {
            if (visConfirmDialog && window.confirm(confirmTekst)) {
                setIsOpen(false);
                dispatch(navigerAction(null));
            }
            if (!visConfirmDialog) {
                setIsOpen(false);
                dispatch(navigerAction(null));
            }
        } else {
            setIsOpen(false);
            dispatch(navigerAction(null));
        }
    };

    return (
        <Formik
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={values => props.handleSubmit(values)}
            render={formikProps => (
                <NavFrontendModal
                    className={cls(props.className)}
                    contentLabel={props.contentLabel}
                    isOpen={props.isOpen ? props.isOpen : isOpen}
                    onRequestClose={() => tilbake(formikProps)}
                    closeButton={true}
                    portalClassName="visittkortfs-modal"
                >
                    <ModalHeader />
                    {props.render(formikProps)}
                </NavFrontendModal>
            )}
        />
    );
}

export default FormikModal;
