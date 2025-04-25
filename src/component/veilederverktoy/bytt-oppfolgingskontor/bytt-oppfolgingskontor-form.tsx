import { ArbeidsOppfolgingKontorDTO, Kontor } from '../../../api/ao-oppfolgingskontor';
import { Field, useFormikContext } from 'formik';
import { Button, TextField } from '@navikt/ds-react';
import KontorDropdown from '../opprett-oppgave/components/opprett-oppgave-enhet-dropdown';

interface ByttOppfolgingskontorFormProps {
    tilbake: () => void;
    alleKontor: Kontor[];
    isKontorFetchLoading: boolean;
}

function ByttOppfolgingskontorForm({ tilbake, alleKontor, isKontorFetchLoading }: ByttOppfolgingskontorFormProps) {
    const formikProps = useFormikContext<ArbeidsOppfolgingKontorDTO>();
    const harSkiftetKontor = formikProps.initialValues.kontorId !== formikProps.values.kontorId;

    return (
        <div className="space-y-4">
            <KontorDropdown
                valgtKontorId={formikProps.values.kontorId}
                alleKontor={alleKontor}
                isLoading={isKontorFetchLoading}
                formikFieldName={'kontorId'}
            />
            <Field as={TextField} label={'Begrunnelse (frivillig)'} name={'begrunnelse'} />
            <div className="space-x-4">
                <Button
                    loading={formikProps.isSubmitting}
                    disabled={!harSkiftetKontor || formikProps.isSubmitting}
                    variant="primary"
                    size="small"
                    className=""
                    type="submit"
                >
                    Bekreft
                </Button>
                <Button disabled={formikProps.isSubmitting} variant="secondary" size="small" onClick={tilbake}>
                    Avbryt
                </Button>
            </div>
        </div>
    );
}

export default ByttOppfolgingskontorForm;
