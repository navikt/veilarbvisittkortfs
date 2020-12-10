import React, { useEffect, useState } from 'react';
import SokFilter from '../../../components/sokfilter/sok-filter';
import FormikRadioGroup from '../../../components/formik/formik-radiogroup';
import { FormikProps } from 'formik';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import Dropdown from '../../../components/dropdown/dropdown';
import { OrNothing } from '../../../../util/type/ornothing';
import { StringOrNothing } from '../../../../util/type/stringornothings';
import { BehandlandeEnhet, hentBehandlendeEnheter, hentKode6Enhet, OppgaveTema } from '../../../../api/veilarboppgave';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface OpprettOppgaveVelgEnhet {
    tema: OrNothing<OppgaveTema>;
    value: StringOrNothing;
    fnr: string;
    formikProps: FormikProps<OpprettOppgaveFormValues>;
    erKode6Bruker?: boolean;
}

function OpprettOppgaveVelgEnhet({ value, tema, fnr, formikProps, erKode6Bruker }: OpprettOppgaveVelgEnhet) {
    const [behandladeEnheter, setBehandladeEnheter] = useState([] as BehandlandeEnhet[]);
    const { setFieldValue } = formikProps;

    useEffect(() => {
        if (erKode6Bruker) {
            hentKode6Enhet().then((res) => {
                const kode6Enhet = res.data;
                setBehandladeEnheter([kode6Enhet]);
                setFieldValue('enhetId', kode6Enhet.enhetId);
            });
        }
    }, [erKode6Bruker, setFieldValue]);

    useEffect(() => {
        if (tema && !erKode6Bruker) {
            hentBehandlendeEnheter(tema, fnr).then((res) => {
                const behandlendeEnhetersData = res.data;
                setBehandladeEnheter(behandlendeEnhetersData);
                setFieldValue('enhetId', behandlendeEnhetersData[0].enhetId);
                document
                    .getElementsByName('Velg enhet')
                    .forEach((elem) => ((elem as HTMLInputElement).checked = false));
            });
        }
    }, [tema, fnr, erKode6Bruker, setFieldValue]);

    if (behandladeEnheter.length === 0) {
        return <NavFrontendSpinner type="M" />;
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
