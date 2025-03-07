import { useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import { Skeleton } from '@navikt/ds-react';
import SokFilter from '../../../components/sokfilter/sok-filter';
import FormikRadioGroup from '../../../components/formik/formik-radiogroup';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import { BehandlandeEnhet, hentBehandlendeEnheter, OppgaveTema } from '../../../../api/veilarboppgave';
import { OrNothing, StringOrNothing } from '../../../../util/type/utility-types';
import SelectMedSok from './select-med-sok/select-med-sok';

interface OpprettOppgaveVelgEnhetProps {
    tema: OrNothing<OppgaveTema>;
    value: StringOrNothing;
    fnr: string;
    formikProps: FormikProps<OpprettOppgaveFormValues>;
}

const behandlingsnummer = 'B643';

function OpprettOppgaveVelgEnhet({ value, tema, fnr, formikProps }: OpprettOppgaveVelgEnhetProps) {
    const [behandladeEnheter, setBehandladeEnheter] = useState([] as BehandlandeEnhet[]);
    const [isLoading, setIsLoading] = useState(true);
    const { setFieldValue } = formikProps;

    useEffect(() => {
        if (tema) {
            hentBehandlendeEnheter(tema, fnr, behandlingsnummer).then(res => {
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
        <div className="skjemaelement navds-form-field navds-form-field--medium navds-date__field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="navds-form-field__label navds-label navds-label--small">Enhet</label>
            {isLoading ? (
                <Skeleton
                    variant="rectangle"
                    style={{ borderRadius: 'var(--a-border-radius-medium)', lineHeight: '1.333' }}
                    height="2rem"
                    width="12rem"
                />
            ) : (
                <SelectMedSok
                    name="Velg enhet dropdown"
                    knappeTekst={`${valgtEnhet.enhetId} ${valgtEnhet.navn}`}
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
