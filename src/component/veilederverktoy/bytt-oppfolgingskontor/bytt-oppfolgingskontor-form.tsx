import { ByttOppfolgingskontorFormValues } from './bytt-oppfolgingskontor-modal';
import { FormikProps } from 'formik';
import { Button } from '@navikt/ds-react';
import OpprettOppgaveVelgEnhet from '../opprett-oppgave/components/opprett-oppgave-enhet-dropdown';

interface ByttOppfolgingskontorFormProps {
    fnr: string;
    enhetId: string;
    formikProps: FormikProps<ByttOppfolgingskontorFormValues>;
    tilbake: () => void;
}

function ByttOppfolgingskontorForm({ fnr, enhetId, formikProps, tilbake }: ByttOppfolgingskontorFormProps) {
    return (
        <div className="modal-footer">
            <OpprettOppgaveVelgEnhet value={enhetId} tema={"OPPFOLGING"} fnr={fnr} formikProps={formikProps} />
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
