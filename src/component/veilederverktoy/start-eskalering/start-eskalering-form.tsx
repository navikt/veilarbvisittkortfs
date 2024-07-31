import { ReactNode } from 'react';
import { Form } from 'formik';
import FormikModal from '../../components/formik/formik-modal';
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
    infoTekst?: ReactNode;
    maxLength?: number;
}

type StartEskaleringFormProps<T extends StartEskaleringValues> = OwnProps<T>;

function StartEskaleringForm<T extends StartEskaleringValues>({
    initialValues,
    handleSubmit,
    tekstariaLabel,
    isLoading,
    tittel,
    infoTekst,
    maxLength
}: StartEskaleringFormProps<T>) {
    return (
        <FormikModal
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            visConfirmDialog={true}
            tittel={tittel}
            render={({ values }) => (
                <div>
                    {infoTekst}
                    <div>
                        <Form>
                            <Maltekstvelger />
                            <BegrunnelseTextArea
                                tekstariaLabel={tekstariaLabel}
                                maxLength={maxLength}
                                hidden={values.type === initialValues.type}
                            />
                            <BegrunnelseFooter spinner={isLoading} disabled={values.type === initialValues.type} />
                        </Form>
                    </div>
                </div>
            )}
        />
    );
}

export default StartEskaleringForm;
