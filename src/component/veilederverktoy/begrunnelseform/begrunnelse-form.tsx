import { ReactNode } from 'react';
import { Form } from 'formik';
import BegrunnelseFooter from './begrunnelse-form-footer';
import FormikModal from '../../components/formik/formik-modal';
import { BegrunnelseTextArea } from './begrunnelse-textarea';

export interface BegrunnelseValues {
    begrunnelse: string;
}

interface OwnProps<T extends BegrunnelseValues> {
    initialValues: T;
    handleSubmit: (values: T) => void;
    tekstariaLabel: string;
    tittel: string;
    infoTekst: ReactNode;
    isLoading: boolean;
    maxLength?: number;
}

type BegrunnelseFormProps<T extends BegrunnelseValues> = OwnProps<T>;

function BegrunnelseForm<T extends BegrunnelseValues>({
    initialValues,
    handleSubmit,
    tekstariaLabel,
    tittel,
    infoTekst,
    isLoading,
    maxLength
}: BegrunnelseFormProps<T>) {
    return (
        <FormikModal
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            visConfirmDialog={true}
            tittel={tittel}
            render={() => (
                <>
                    {infoTekst}
                    <Form>
                        <BegrunnelseTextArea tekstariaLabel={tekstariaLabel} maxLength={maxLength} />
                        <BegrunnelseFooter spinner={isLoading} />
                    </Form>
                </>
            )}
        />
    );
}

export default BegrunnelseForm;
