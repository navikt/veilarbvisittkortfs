import React from 'react';
import BegrunnelseFooter from './begrunnelse-form-footer';
import FormikModal from '../../components/formik/formik-modal';
import { Form, FormikProps } from 'formik';
import { BegrunnelseTextArea } from './begrunnelse-textarea';

export interface BegrunnelseValues {
    begrunnelse: string;
}

interface OwnProps<T extends BegrunnelseValues> {
    initialValues: T;
    handleSubmit: (values: T) => void;
    tekstariaLabel: string;
    isLoading: boolean;
    tittel?: string;
    infoTekst?: React.ReactNode;
    render?: (formikProps: FormikProps<T>) => React.ReactNode;
    maxLength?: number;
}

type BegrunnelseFormProps<T extends BegrunnelseValues> = OwnProps<T>;

function BegrunnelseForm<T extends BegrunnelseValues>(props: BegrunnelseFormProps<T>) {
    return (
        <FormikModal
            initialValues={props.initialValues}
            handleSubmit={props.handleSubmit}
            contentLabel=""
            visConfirmDialog={true}
            tittel={props.tittel}
            render={() => (
                <div className="modal-innhold">
                    {props.infoTekst}
                    <Form>
                        <BegrunnelseTextArea tekstariaLabel={props.tekstariaLabel} maxLength={props.maxLength} />
                        <BegrunnelseFooter spinner={props.isLoading} />
                    </Form>
                </div>
            )}
        />
    );
}

export default BegrunnelseForm;
