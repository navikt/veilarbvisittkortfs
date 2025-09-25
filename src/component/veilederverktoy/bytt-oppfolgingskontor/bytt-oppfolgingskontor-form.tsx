import { ArbeidsOppfolgingKontorDTO, Kontor, KvittertKontor, settKontor } from '../../../api/ao-oppfolgingskontor';
import { Field, Formik, Form } from 'formik';
import { Button, TextField } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { useAppStore } from '../../../store/app-store';
import KontorDropdown from '../opprett-oppgave/components/kontorDropdown';

interface ByttOppfolgingskontorFormProps {
    tilbake: () => void;
    alleKontor: Kontor[];
    isKontorFetchLoading: boolean;
    setSettKontorError: (error: string | undefined) => void;
    setKvittering: (kvittering: { fraKontor: KvittertKontor; tilKontor: KvittertKontor }) => void;
}

function ByttOppfolgingskontorForm({
    tilbake,
    alleKontor,
    isKontorFetchLoading,
    setKvittering,
    setSettKontorError
}: ByttOppfolgingskontorFormProps) {
    const { brukerFnr, enhetId } = useAppStore();
    const arbeidsOppfolgingKontorInitialValues: ArbeidsOppfolgingKontorDTO = {
        ident: brukerFnr,
        kontorId: enhetId || ''
    };

    async function lagreOppfolgingskontor(formdata: ArbeidsOppfolgingKontorDTO) {
        try {
            setSettKontorError(undefined);
            const response = await settKontor(formdata);
            const kontorKvittering = response.data;
            setKvittering({
                fraKontor: kontorKvittering.fraKontor,
                tilKontor: kontorKvittering.tilKontor
            });
        } catch (error) {
            const axisosError = error as AxiosError<string>;
            setSettKontorError(axisosError.response?.data || axisosError.message);
        }
    }

    return (
        <Formik initialValues={arbeidsOppfolgingKontorInitialValues} onSubmit={lagreOppfolgingskontor}>
            {formikProps => (
                <Form className="space-y-8">
                    <KontorDropdown
                        valgtKontorId={formikProps.values.kontorId}
                        alleKontor={alleKontor}
                        isLoading={isKontorFetchLoading}
                        formikFieldName={'kontorId'}
                    />
                    <Field as={TextField} label={'Begrunnelse (frivillig)'} name={'begrunnelse'} />
                    <div className="space-x-4">
                        <div>
                            {/*
                                Ekstra div pga alle stiler fra Aksel i veilarbpersonflate er ikke i plassert i
                                css-layer components enda og vil da overstyre tailwind stiler
                            */}
                            <Button
                                loading={formikProps.isSubmitting}
                                disabled={!formikProps.dirty || formikProps.isSubmitting}
                                variant="primary"
                                size="small"
                                type="submit"
                            >
                                Bekreft
                            </Button>
                        </div>
                        <div>
                            <Button
                                disabled={formikProps.isSubmitting}
                                variant="secondary"
                                size="small"
                                onClick={tilbake}
                            >
                                Avbryt
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default ByttOppfolgingskontorForm;
