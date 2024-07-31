import { Form } from 'formik';
import { BodyShort } from '@navikt/ds-react';
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
}

type StartEskaleringFormProps<T extends StartEskaleringValues> = OwnProps<T>;

function StartEskaleringForm<T extends StartEskaleringValues>({
    initialValues,
    handleSubmit
}: StartEskaleringFormProps<T>) {
    return (
        <FormikModal
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            visConfirmDialog={true}
            tittel="Send varsel om mulig stans"
            render={({ values }) => (
                <div>
                    <BodyShort size="small">
                        Når du sender forhåndsvarsel må du huske å være tydelig på hvilken oppgave som skal gjennomføre,
                        og hvilken frist personen får for tilbakemelding. Personen får en brukernotifikasjon på ditt nav
                        med teksten: Viktig oppgave. NAV vurderer å stanse pengene dine. Se hva du må gjøre.
                    </BodyShort>
                    <BodyShort size="small">
                        Ved å klikke på brukernotifikasjon, kommer personen direkte inn i riktig dialog der
                        forhåndsvarslet ligger.
                    </BodyShort>

                    <div>
                        <Form>
                            <Maltekstvelger />
                            <BegrunnelseTextArea
                                tekstariaLabel="Rediger teksten under slik at den passer."
                                maxLength={5000}
                                hidden={values.type === initialValues.type}
                            />
                            <BegrunnelseFooter spinner={false} disabled={values.type === initialValues.type} />
                        </Form>
                    </div>
                </div>
            )}
        />
    );
}

export default StartEskaleringForm;
