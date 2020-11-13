import React, { useEffect, useState } from 'react';
import SokFilter from '../../../components/sokfilter/sok-filter';
import FormikRadioGroup from '../../../components/formik/formik-radiogroup';
import OppgaveApi from '../../../../api/oppgave-api';
import { FormikProps } from 'formik';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import Dropdown from '../../../components/dropdown/dropdown';
import { OrNothing } from '../../../../util/type/ornothing';
import { StringOrNothing } from '../../../../util/type/stringornothings';
import { BehandlandeEnhet, OppgaveTema } from '../../../../api/data/oppgave';

interface OpprettOppgaveVelgEnhet {
    tema: OrNothing<OppgaveTema>;
    value: StringOrNothing;
    fnr: string;
    formikProps: FormikProps<OpprettOppgaveFormValues>;
}

function OpprettOppgaveVelgEnhet({ value, tema, fnr, formikProps }: OpprettOppgaveVelgEnhet) {
    const [behandladeEnheter, setBehandladeEnheter] = useState([] as BehandlandeEnhet[]);
    const [isLoading, setIsLoading] = useState(true);
    const { setFieldValue } = formikProps;

    useEffect(() => {
        if (tema) {
            OppgaveApi.hentBehandlandeEnheter(tema, fnr).then((behandladeEnheterData: BehandlandeEnhet[]) => {
                setBehandladeEnheter(behandladeEnheterData);
                setFieldValue('enhetId', behandladeEnheterData[0].enhetId);
                setIsLoading(false);
                document
                    .getElementsByName('Velg enhet')
                    .forEach((elem) => ((elem as HTMLInputElement).checked = false));
            });
        }
    }, [tema, fnr, setFieldValue]);

    if (isLoading) {
        return <div />;
    }

    const valgtEnhet: OrNothing<BehandlandeEnhet> =
        behandladeEnheter.find((enhet) => enhet.enhetId === value) || behandladeEnheter[0];
    return (
        <div className="skjemaelement">
            <label className="skjemaelement__label">Enhet *</label>
            <Dropdown
                name="Velg enhet dropdown"
                knappeTekst={`${valgtEnhet.enhetId} ${valgtEnhet.navn}`}
                className="velg-enhet-dropdown"
                btnClassnames="velg-enhet-dropdown__button"
                render={(lukkDropdown) => (
                    <SokFilter data={behandladeEnheter} label="" placeholder="Søk etter enhet">
                        {(data) => (
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
        </div>
    );
}

export default OpprettOppgaveVelgEnhet;
