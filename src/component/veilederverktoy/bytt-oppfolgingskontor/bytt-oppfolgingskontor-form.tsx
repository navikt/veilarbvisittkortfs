import { ArbeidsOppfolgingKontorDTO, hentAlleKontor } from '../../../api/ao-oppfolgingskontor';
import { FormikProps } from 'formik';
import { Button } from '@navikt/ds-react';
import KontorDropdown from '../opprett-oppgave/components/opprett-oppgave-enhet-dropdown';
import { useEffect } from 'react';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';

interface ByttOppfolgingskontorFormProps {
    fnr: string;
    kontorId: string;
    formikProps: FormikProps<ArbeidsOppfolgingKontorDTO>;
    tilbake: () => void;
}

function ByttOppfolgingskontorForm({ kontorId, tilbake }: ByttOppfolgingskontorFormProps) {
    const alleKontorFetcher = useAxiosFetcher(hentAlleKontor);

    useEffect(() => {
        alleKontorFetcher.fetch();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <div className="space-y-4">
            <KontorDropdown
                valgtKontorId={kontorId}
                alleKontor={alleKontorFetcher.data?.data.alleKontor || []}
                isLoading={alleKontorFetcher.loading}
                formikFieldName={'kontorId'}
            />
            <div className="space-x-4">
                <Button variant="primary" size="small" className="" type="submit">
                    Bekreft
                </Button>
                <Button variant="secondary" size="small" onClick={tilbake}>
                    Avbryt
                </Button>
            </div>
        </div>
    );
}

export default ByttOppfolgingskontorForm;
