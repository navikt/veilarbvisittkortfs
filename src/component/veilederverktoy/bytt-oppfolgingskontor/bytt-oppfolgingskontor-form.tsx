import { ArbeidsOppfolgingKontorDTO, hentAlleKontor } from '../../../api/ao-oppfolgingskontor';
import { Field, useFormikContext } from 'formik';
import { Button, TextField } from '@navikt/ds-react';
import KontorDropdown from '../opprett-oppgave/components/opprett-oppgave-enhet-dropdown';
import { useEffect } from 'react';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';

interface ByttOppfolgingskontorFormProps {
    fnr: string;
    tilbake: () => void;
}

function ByttOppfolgingskontorForm({ tilbake }: ByttOppfolgingskontorFormProps) {
    const formikProps = useFormikContext<ArbeidsOppfolgingKontorDTO>();
    const alleKontorFetcher = useAxiosFetcher(hentAlleKontor);
    const harSkiftetKontor = formikProps.initialValues.kontorId !== formikProps.values.kontorId;

    useEffect(() => {
        alleKontorFetcher.fetch();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <div className="space-y-4">
            <KontorDropdown
                valgtKontorId={formikProps.values.kontorId}
                alleKontor={alleKontorFetcher.data?.data.alleKontor || []}
                isLoading={alleKontorFetcher.loading}
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
