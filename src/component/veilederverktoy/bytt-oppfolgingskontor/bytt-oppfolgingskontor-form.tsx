import { ArbeidsOppfolgingKontorDTO } from '../../../api/ao-oppfolgingskontor';
import { FormikProps } from 'formik';
import { Button } from '@navikt/ds-react';
import OpprettOppgaveVelgEnhet from '../opprett-oppgave/components/opprett-oppgave-enhet-dropdown';

interface ByttOppfolgingskontorFormProps {
    fnr: string;
    kontorId: string;
    formikProps: FormikProps<ArbeidsOppfolgingKontorDTO>;
    tilbake: () => void;
}

function ByttOppfolgingskontorForm({ fnr, kontorId, formikProps, tilbake }: ByttOppfolgingskontorFormProps) {
    return (
        <div className="modal-footer">
            <OpprettOppgaveVelgEnhet value={kontorId} tema={"OPPFOLGING"} fnr={fnr} formikProps={formikProps} />
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
