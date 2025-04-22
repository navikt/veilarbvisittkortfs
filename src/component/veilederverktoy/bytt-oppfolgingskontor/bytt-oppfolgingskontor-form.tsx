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

function ByttOppfolgingskontorForm({kontorId, formikProps, tilbake }: ByttOppfolgingskontorFormProps) {
    const alleKontorFetcher = useAxiosFetcher(hentAlleKontor);

    useEffect(() => {
        alleKontorFetcher.fetch();
    }, []);

    return (
        <div className="modal-footer">
            <KontorDropdown valgtKontorId={kontorId} alleKontor={alleKontorFetcher.data?.data.alleKontor || []} isLoading={alleKontorFetcher.loading} formikProps={formikProps} />
            <Button variant="primary" size="small" className="bekreft-btn" type="submit">
                Bekreft
            </Button>
            <Button variant="secondary" size="small" onClick={tilbake}>
                Avbryt
            </Button>
        </div>
    );
}

export default ByttOppfolgingskontorForm;
