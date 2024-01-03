import React from 'react';
import OpprettOppgaveTypeSelector from './opprett-oppgave-type-selector';
import OpprettOppgavePrioritetSelector from './opprett-oppgave-prioritet-selector';
import OpprettOppgaveVelgDatoer from './opprett-oppgave-dato-velger';
import OpprettOppgaveVelgEnhet from './opprett-oppgave-enhet-dropdown';
import OpprettOppgaveVelgVeileder from './opprett-oppgave-veileder-selector';
import OpprettOppgaveBeskrivelseTekstArea from './opprett-oppgave-beskrivelse-textarea';
import HiddenIfDiv from '../../../components/hidden-if/hidden-if-div';
import { FormikProps } from 'formik';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import { OppgaveTema } from '../../../../api/veilarboppgave';
import { OrNothing, StringOrNothing } from '../../../../util/type/utility-types';
import { Button } from '@navikt/ds-react';

interface OppgaveInnerFormProps {
    fnr: string;
    tema: OrNothing<OppgaveTema>;
    enhetId: StringOrNothing;
    veilederId: StringOrNothing;
    avsenderenhetId: string;
    formikProps: FormikProps<OpprettOppgaveFormValues>;
    tilbake: () => void;
}

function OppgaveInnerForm({
    fnr,
    tema,
    enhetId,
    veilederId,
    avsenderenhetId,
    formikProps,
    tilbake
}: OppgaveInnerFormProps) {
    if (!tema) {
        return null;
    }

    return (
        <>
            <div className="oppgave-type-og-prioritet-container">
                <OpprettOppgaveTypeSelector oppgaveTema={tema} />
                <OpprettOppgavePrioritetSelector />
            </div>
            <OpprettOppgaveVelgDatoer />
            <div className="oppgave-enhet-container">
                <OpprettOppgaveVelgEnhet value={enhetId} tema={tema} fnr={fnr} formikProps={formikProps} />
                <OpprettOppgaveVelgVeileder
                    tema={tema}
                    veilederId={veilederId}
                    formikProps={formikProps}
                    enhetId={!!enhetId ? enhetId : avsenderenhetId}
                />
            </div>
            <OpprettOppgaveBeskrivelseTekstArea />
            <HiddenIfDiv className="modal-footer" hidden={!tema}>
                <Button variant="primary" size="small" className="btn--mr1" type="submit" spinner={false}>
                    Bekreft
                </Button>
                <Button variant="secondary" size="small" className="btn--mr1" onClick={tilbake}>
                    Avbryt
                </Button>
            </HiddenIfDiv>
        </>
    );
}

export default OppgaveInnerForm;
