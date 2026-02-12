import { ArbeidsOppfolgingKontorDTO, Kontor, KvittertKontor, settKontor } from '../../../api/ao-oppfolgingskontor';
import { Formik, Form } from 'formik';
import { Button } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { useEnhetId } from '../../../store/app-store';
import KontorDropdown from '../opprett-oppgave/components/kontorDropdown';

interface ByttOppfolgingskontorFormProps {
    brukerFnr: string;
    tilbake: () => void;
    alleKontor: Kontor[];
    isKontorFetchLoading: boolean;
    setSettKontorError: (error: string | undefined) => void;
    setKvittering: (kvittering: { fraKontor: KvittertKontor; tilKontor: KvittertKontor }) => void;
}

function ByttOppfolgingskontorForm({
    brukerFnr,
    tilbake,
    alleKontor,
    isKontorFetchLoading,
    setKvittering,
    setSettKontorError
}: ByttOppfolgingskontorFormProps) {
    const enhetId = useEnhetId();
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
                        label="Nytt kontor for arbeidsrettet oppfølging"
                        description="Velg i listen eller skriv inn navn på kontoret du ønsker å bytte til"
                        valgtKontorId={formikProps.values.kontorId}
                        alleKontor={alleKontor}
                        isLoading={isKontorFetchLoading}
                        formikFieldName={'kontorId'}
                    />
                    <div className="space-x-4 flex">
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
