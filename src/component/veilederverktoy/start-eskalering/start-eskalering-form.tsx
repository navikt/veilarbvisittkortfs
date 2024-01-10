import React from 'react';
import FormikModal from '../../components/formik/formik-modal';
import { Form, FormikProps } from 'formik';
import Maltekstvelger from './maltekstvelger';
import { BegrunnelseTextArea } from '../begrunnelseform/begrunnelse-textarea';
import BegrunnelseFooter from '../begrunnelseform/begrunnelse-form-footer';

export interface StartEskaleringValues {
    begrunnelse: string;
    type: string;
}

interface OwnProps<T extends StartEskaleringValues> {
    initialValues: T;
    handleSubmit: (values: T) => void;
    tekstariaLabel: string;
    isLoading: boolean;
    tittel?: string;
    infoTekst?: React.ReactNode;
    render?: (formikProps: FormikProps<T>) => React.ReactNode;
    maxLength?: number;
}

type StartEskaleringFormProps<T extends StartEskaleringValues> = OwnProps<T>;

function StartEskaleringForm<T extends StartEskaleringValues>(props: StartEskaleringFormProps<T>) {
    return (
        <FormikModal
            initialValues={props.initialValues}
            handleSubmit={props.handleSubmit}
            contentLabel=""
            visConfirmDialog={true}
            tittel={props.tittel}
            render={({ values }) => (
                <div>
                    {props.infoTekst}
                    <div>
                        <Form>
                            <Maltekstvelger />
                            <BegrunnelseTextArea
                                tekstariaLabel={props.tekstariaLabel}
                                maxLength={props.maxLength}
                                hidden={values.type === props.initialValues.type}
                            />
                            <BegrunnelseFooter
                                spinner={props.isLoading}
                                disabled={values.type === props.initialValues.type}
                            />
                        </Form>
                    </div>
                </div>
            )}
        />
    );
}

export default StartEskaleringForm;
