import React, { useEffect, useState } from 'react';
import SokFilter from '../../../components/sokfilter/sok-filter';
import FormikRadioGroup from '../../../components/formik/formik-radiogroup';
import Dropdown from '../../../components/dropdown/dropdown';
import { FormikProps } from 'formik';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import { StringOrNothing } from '../../../../util/type/stringornothings';
import { OrNothing } from '../../../../util/type/ornothing';
import { useDataStore } from '../../../../store/data-store';
import { fetchVeilederePaEnhet, VeilederData } from '../../../../api/veilarbveileder';
import { OppgaveTema } from '../../../../api/veilarboppgave';
import { useAxiosFetcher } from '../../../../util/hook/use-axios-fetcher';
import { ifResponseHasData } from '../../../../util/utils';

interface OpprettOppgaveVelgVeilederProps {
    veilederId: StringOrNothing;
    tema: OrNothing<OppgaveTema>;
    formikProps: FormikProps<OpprettOppgaveFormValues>;
    enhetId: string;
}

function OpprettOppgaveVelgVeileder({ veilederId, tema, formikProps, enhetId }: OpprettOppgaveVelgVeilederProps) {
    const { veilederePaEnhet, setVeilederePaEnhet } = useDataStore();
    const [feilmelding, setFeilmelding] = useState(false);

    const veilederePaEnhetFetcher = useAxiosFetcher(fetchVeilederePaEnhet);

    const veilederListe = veilederePaEnhet?.veilederListe || [];

    useEffect(() => {
        if (enhetId) {
            setFeilmelding(false);
            setVeilederePaEnhet(undefined);
            formikProps.setFieldValue('veilederId', null);
            veilederePaEnhetFetcher
                .fetch(enhetId)
                .then(ifResponseHasData(setVeilederePaEnhet))
                .catch(() => setFeilmelding(true));
        }
        // eslint-disable-next-line
    }, [enhetId, setVeilederePaEnhet]);

    if (tema !== 'OPPFOLGING' && formikProps.values.veilederId) {
        formikProps.setFieldValue('veilederId', null);
    }

    if (tema !== 'OPPFOLGING' || feilmelding) {
        return null;
    }

    const valgtVeileder: OrNothing<VeilederData> = veilederListe.find(veileder => veileder.ident === veilederId);

    const sorterteVeiledere = veilederListe.sort((a, b) => a.etternavn.localeCompare(b.etternavn));

    return (
        <div className="skjemaelement">
            <label className="skjemaelement__label">Veileder</label>
            <Dropdown
                name="Velg veileder dropdown"
                knappeTekst={(valgtVeileder && valgtVeileder.navn) || ''}
                className="skjemaelement velg-enhet-dropdown"
                btnClassnames="velg-enhet-dropdown__button"
                render={lukkDropdown => (
                    <SokFilter data={sorterteVeiledere} label="" placeholder="Søk etter veileder">
                        {data => (
                            <FormikRadioGroup
                                data={data}
                                createLabel={(veileder: VeilederData) => veileder.navn}
                                createValue={(veileder: VeilederData) => veileder.ident}
                                radioName="Velg veileder"
                                closeDropdown={lukkDropdown}
                                name="veilederId"
                            />
                        )}
                    </SokFilter>
                )}
            />
        </div>
    );
}

export default OpprettOppgaveVelgVeileder;
