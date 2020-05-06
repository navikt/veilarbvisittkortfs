import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import FormikModal from '../../components/formik/formik-modal';
import { FormikProps } from 'formik';
import MalteksterForm from './maltekster-form';

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

type BegrunnelseFormProps<T extends BegrunnelseValues> = OwnProps<T> & InjectedIntlProps;

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
                    <MalteksterForm isLoading={props.isLoading} maxLength={props.maxLength} tekstariaLabel={props.tekstariaLabel} intl={props.intl}/>
                </div>
            )}
        />
    );
}

export default BegrunnelseForm;
