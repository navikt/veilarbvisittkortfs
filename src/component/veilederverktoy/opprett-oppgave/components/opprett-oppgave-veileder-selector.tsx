import { useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import SokFilter from '../../../components/sokfilter/sok-filter';
import FormikRadioGroup from '../../../components/formik/formik-radiogroup';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import { useDataStore } from '../../../../store/data-store';
import { fetchVeilederePaEnhet, VeilederData } from '../../../../api/veilarbveileder';
import { OppgaveTema } from '../../../../api/veilarboppgave';
import { useAxiosFetcher } from '../../../../util/hook/use-axios-fetcher';
import { ifResponseHasData } from '../../../../util/utils';
import { OrNothing, StringOrNothing } from '../../../../util/type/utility-types';
import SelectMedSok from './select-med-sok/select-med-sok';

interface OpprettOppgaveVelgVeilederProps {
    veilederId: StringOrNothing;
    tema: OrNothing<OppgaveTema>;
    formikProps: FormikProps<OpprettOppgaveFormValues>;
    enhetId: string;
}

function OpprettOppgaveVelgVeileder({ veilederId, tema, formikProps, enhetId }: OpprettOppgaveVelgVeilederProps) {
    const { veilederePaEnhet, setVeilederePaEnhet } = useDataStore();
    const [ingenData, setIngenData] = useState(false);

    const veilederePaEnhetFetcher = useAxiosFetcher(fetchVeilederePaEnhet);

    const veilederListe = veilederePaEnhet?.veilederListe || [];

    useEffect(() => {
        setIngenData(false);
        setVeilederePaEnhet(undefined);
        formikProps.setFieldValue('veilederId', null);
        if (tema === 'OPPFOLGING') {
            veilederePaEnhetFetcher
                .fetch(enhetId)
                .then(ifResponseHasData(setVeilederePaEnhet))
                .catch(() => setIngenData(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enhetId, tema]);

    if (tema !== 'OPPFOLGING' && formikProps.values.veilederId) {
        formikProps.setFieldValue('veilederId', null);
    }

    if (tema !== 'OPPFOLGING' || ingenData) {
        return null;
    }

    const valgtVeileder: OrNothing<VeilederData> = veilederListe.find(veileder => veileder.ident === veilederId);

    const sorterteVeiledere = veilederListe.sort((a, b) => a.etternavn.localeCompare(b.etternavn));

    return (
        <div className="skjemaelement navds-form-field navds-form-field--medium navds-date__field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="skjemaelement__label navds-form-field__label navds-label navds-label--small">
                Veileder (valgfritt)
            </label>
            <SelectMedSok
                name="Velg veileder dropdown"
                knappeTekst={(valgtVeileder && valgtVeileder.navn) || ''}
                className="velg-enhet-dropdown"
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
