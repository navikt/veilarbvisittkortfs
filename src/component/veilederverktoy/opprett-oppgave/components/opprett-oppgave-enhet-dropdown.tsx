import React, { useEffect, useState } from 'react';
import SokFilter from '../../../components/sokfilter/sok-filter';
import FormikRadioGroup from '../../../components/formik/formik-radiogroup';
import { FormikProps } from 'formik';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import Dropdown from '../../../components/dropdown/dropdown';
import { OrNothing } from '../../../../util/type/ornothing';
import { StringOrNothing } from '../../../../util/type/stringornothings';
import { BehandlandeEnhet, hentBehandlendeEnheter, OppgaveTema } from '../../../../api/veilarboppgave';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface OpprettOppgaveVelgEnhetProps {
    tema: OrNothing<OppgaveTema>;
    value: StringOrNothing;
    fnr: string;
    formikProps: FormikProps<OpprettOppgaveFormValues>;
}

function OpprettOppgaveVelgEnhet({ value, tema, fnr, formikProps }: OpprettOppgaveVelgEnhetProps) {
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
                document.getElementsByName('Velg enhet').forEach(elem => ((elem as HTMLInputElement).checked = false));
            });
        }
    }, [tema, fnr, setFieldValue]);

    const valgtEnhet: OrNothing<BehandlandeEnhet> =
        behandladeEnheter.find(enhet => enhet.enhetId === value) || behandladeEnheter[0];

    return (
        <div className="skjemaelement">
            <label className="skjemaelement__label">Enhet *</label>
            {isLoading ? (
                <div className="velgenhet-spinner">
                    <NavFrontendSpinner type="M" className="skjemaelement" />
                </div>
            ) : (
                <Dropdown
                    name="Velg enhet dropdown"
                    knappeTekst={`${valgtEnhet.enhetId} ${valgtEnhet.navn}`}
                    className="velg-enhet-dropdown"
                    btnClassnames="velg-enhet-dropdown__button"
                    render={lukkDropdown => (
                        <SokFilter data={behandladeEnheter} label="" placeholder="Søk etter enhet">
                            {data => (
                                <FormikRadioGroup
                                    defaultValue={behandladeEnheter[0].enhetId}
                                    data={data}
                                    createLabel={(behandlandeEnhet: BehandlandeEnhet) =>
                                        `${behandlandeEnhet.enhetId} ${behandlandeEnhet.navn}`
                                    }
                                    createValue={(behandlandeEnhet: BehandlandeEnhet) => behandlandeEnhet.enhetId}
                                    radioName="Velg enhet"
                                    closeDropdown={lukkDropdown}
                                    name="enhetId"
                                />
                            )}
                        </SokFilter>
                    )}
                />
            )}
        </div>
    );
}

export default OpprettOppgaveVelgEnhet;
