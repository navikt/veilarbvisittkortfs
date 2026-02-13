import OpprettOppgaveTypeSelector from './opprett-oppgave-type-selector';
import OpprettOppgavePrioritetSelector from './opprett-oppgave-prioritet-selector';
import OpprettOppgaveVelgDatoer from './opprett-oppgave-dato-velger';
import OpprettOppgaveVelgVeileder from './opprett-oppgave-veileder-selector';
import OpprettOppgaveBeskrivelseTekstArea from './opprett-oppgave-beskrivelse-textarea';
import { FormikProps } from 'formik';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import { BehandlandeEnhet, BehandlingsTema, hentBehandlendeEnheter, OppgaveTema } from '../../../../api/veilarboppgave';
import { OrNothing, StringOrNothing } from '../../../../util/type/utility-types';
import { Button } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import KontorDropdown from './kontorDropdown';
import OpprettBehandlingstemaTypeSelector from './opprett-behandlingstema-type-selector';

interface OppgaveInnerFormProps {
    fnr: string;
    tema: OrNothing<OppgaveTema>;
    behandlingsTema: OrNothing<BehandlingsTema>;
    enhetId: StringOrNothing;
    veilederId: StringOrNothing;
    avsenderenhetId: string;
    formikProps: FormikProps<OpprettOppgaveFormValues>;
    tilbake: () => void;
}

function OppgaveInnerForm({
                              fnr,
                              tema,
                              behandlingsTema,
                              enhetId,
                              veilederId,
                              avsenderenhetId,
                              formikProps,
                              tilbake
                          }: OppgaveInnerFormProps) {
    const [behandladeEnheter, setBehandladeEnheter] = useState([] as BehandlandeEnhet[]);
    const [isLoading, setIsLoading] = useState(true);
    const { setFieldValue } = formikProps;

    useEffect(() => {
        if (tema) {
            hentBehandlendeEnheter(tema, fnr).then(res => {
                const behandlendeEnhetersData = res.data;
                setBehandladeEnheter(behandlendeEnhetersData);
                setFieldValue('enhetId', behandlendeEnhetersData[0].enhetId);
                setIsLoading(false);
                document.getElementsByName('Velg kontor').forEach(elem => ((elem as HTMLInputElement).checked = false));
            });
        }
    }, [tema, fnr, setFieldValue]);

    if (!tema) {
        return null;
    }

    return (
        <>
            {tema === 'ARBEIDSAVKLARING' &&
                <div className="oppgave-type-og-prioritet-container">
                    <OpprettBehandlingstemaTypeSelector behandlingsTema={behandlingsTema} />
                </div> }
            <div className="oppgave-type-og-prioritet-container">
                <OpprettOppgaveTypeSelector oppgaveTema={tema} />
                <OpprettOppgavePrioritetSelector />
            </div>
            <OpprettOppgaveVelgDatoer />
            <div className="oppgave-enhet-container">
                <KontorDropdown
                    isLoading={isLoading}
                    valgtKontorId={enhetId}
                    formikFieldName={'enhetId'}
                    alleKontor={behandladeEnheter.map(it => ({ kontorNavn: it.navn, kontorId: it.enhetId }))}
                />
                <OpprettOppgaveVelgVeileder
                    tema={tema}
                    veilederId={veilederId}
                    formikProps={formikProps}
                    enhetId={enhetId || avsenderenhetId}
                />
            </div>
            <OpprettOppgaveBeskrivelseTekstArea />
            {tema && (
                <div className="modal-footer">
                    <Button variant="primary" size="small" className="bekreft-btn" type="submit">
                        Bekreft
                    </Button>
                    <Button variant="secondary" size="small" onClick={tilbake}>
                        Avbryt
                    </Button>
                </div>
            )}
        </>
    );
}

export default OppgaveInnerForm;
