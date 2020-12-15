import React, { useEffect } from 'react';
import SokFilter from '../../../components/sokfilter/sok-filter';
import FormikRadioGroup from '../../../components/formik/formik-radiogroup';
import Dropdown from '../../../components/dropdown/dropdown';
import { FormikProps } from 'formik';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import { StringOrNothing } from '../../../../util/type/stringornothings';
import { OrNothing } from '../../../../util/type/ornothing';
import { useDataStore } from '../../../../store/data-store';
import { useAppStore } from '../../../../store/app-store';
import { fetchVeilederePaEnhet, VeilederData } from '../../../../api/veilarbveileder';
import { OppgaveTema } from '../../../../api/veilarboppgave';
import { useAxiosFetcher } from '../../../../util/hook/use-axios-fetcher';
import { ifResponseHasData } from '../../../../util/utils';

interface OpprettOppgaveVelgVeilederProps {
    veilederId: StringOrNothing;
    avsenderenhetId: StringOrNothing;
    tema: OrNothing<OppgaveTema>;
    formikProps: FormikProps<OpprettOppgaveFormValues>;
}

function OpprettOppgaveVelgVeileder({
    veilederId,
    tema,
    avsenderenhetId,
    formikProps,
}: OpprettOppgaveVelgVeilederProps) {
    const { enhetId } = useAppStore();
    const { veilederePaEnhet, setVeilederePaEnhet } = useDataStore();

    const veilederePaEnhetFetcher = useAxiosFetcher(fetchVeilederePaEnhet);

    const veilederListe = veilederePaEnhet?.veilederListe || [];

    useEffect(() => {
        if (enhetId && !veilederePaEnhet) {
            veilederePaEnhetFetcher.fetch(enhetId).then(ifResponseHasData(setVeilederePaEnhet)).catch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enhetId, veilederePaEnhet]);

    if (tema !== 'OPPFOLGING' && formikProps.values.veilederId) {
        formikProps.setFieldValue('veilederId', null);
    }

    if (!(avsenderenhetId === enhetId && tema === 'OPPFOLGING')) {
        return null;
    }

    const valgtVeileder: OrNothing<VeilederData> = veilederListe.find((veileder) => veileder.ident === veilederId);

    const sorterteVeiledere = veilederListe.sort((a, b) => a.etternavn.localeCompare(b.etternavn));

    return (
        <div className="skjemaelement">
            <label className="skjemaelement__label">Veileder</label>
            <Dropdown
                name="Velg veileder dropdown"
                knappeTekst={(valgtVeileder && valgtVeileder.navn) || ''}
                className="skjemaelement velg-enhet-dropdown"
                btnClassnames="velg-enhet-dropdown__button"
                render={(lukkDropdown) => (
                    <SokFilter data={sorterteVeiledere} label="" placeholder="Søk etter veileder">
                        {(data) => (
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
