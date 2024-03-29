import { ReactNode } from 'react';
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
    infoTekst?: ReactNode;
    render?: (formikProps: FormikProps<T>) => ReactNode;
    maxLength?: number;
}

type BegrunnelseFormProps<T extends BegrunnelseValues> = OwnProps<T>;

function BegrunnelseForm<T extends BegrunnelseValues>(props: BegrunnelseFormProps<T>) {
    return (
        <FormikModal
            initialValues={props.initialValues}
            handleSubmit={props.handleSubmit}
            visConfirmDialog={true}
            tittel={props.tittel}
            render={() => (
                <>
                    {props.infoTekst}
                    <Form>
                        <BegrunnelseTextArea tekstariaLabel={props.tekstariaLabel} maxLength={props.maxLength} />
                        <BegrunnelseFooter spinner={props.isLoading} />
                    </Form>
                </>
            )}
        />
    );
}

export default BegrunnelseForm;
