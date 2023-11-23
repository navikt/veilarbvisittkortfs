import React from 'react';
import OpprettOppgaveTypeSelector from './opprett-oppgave-type-selector';
import OpprettOppgavePrioritetSelector from './opprett-oppgave-prioritet-selector';
import OpprettOppgaveVelgDatoer from './opprett-oppgave-dato-velger';
import OpprettOppgaveVelgEnhet from './opprett-oppgave-enhet-dropdown';
import OpprettOppgaveVelgVeileder from './opprett-oppgave-veileder-selector';
import OpprettOppgaveBeskrivelseTekstArea from './opprett-oppgave-beskrivelse-textarea';
import HiddenIfDiv from '../../../components/hidden-if/hidden-if-div';
import { Button } from '@navikt/ds-react';
import { FormikProps } from 'formik';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import { OppgaveTema } from '../../../../api/veilarboppgave';
import { OrNothing, StringOrNothing } from '../../../../util/type/utility-types';

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
            <OpprettOppgaveTypeSelector oppgaveTema={tema} />
            <OpprettOppgavePrioritetSelector />
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
                <Button variant="primary" className="btn--mr1" type="submit" spinner={false}>
                    Bekreft
                </Button>
                <Button variant="secondary" className="knapp" onClick={tilbake}>
                    Avbryt
                </Button>
            </HiddenIfDiv>
        </>
    );
}

export default OppgaveInnerForm;
