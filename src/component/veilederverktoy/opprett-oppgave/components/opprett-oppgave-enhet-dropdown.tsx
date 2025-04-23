import { Skeleton } from '@navikt/ds-react';
import SokFilter from '../../../components/sokfilter/sok-filter';
import FormikRadioGroup from '../../../components/formik/formik-radiogroup';
import { OrNothing, StringOrNothing } from '../../../../util/type/utility-types';
import SelectMedSok from './select-med-sok/select-med-sok';
import { Kontor } from '../../../../api/ao-oppfolgingskontor';

interface KontorDropdownProps {
    valgtKontorId: StringOrNothing;
    alleKontor: Kontor[];
    isLoading: boolean;
    formikFieldName: 'enhetId' | 'kontorId';
}

function KontorDropdown({ valgtKontorId, alleKontor, isLoading, formikFieldName }: KontorDropdownProps) {
    const valgtKontor: OrNothing<Kontor> =
        alleKontor.find(kontor => kontor.kontorId === valgtKontorId) || alleKontor[0];

    return (
        <div className="skjemaelement navds-form-field navds-form-field--medium navds-date__field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="navds-form-field__label navds-label navds-label--small">Kontor</label>
            {isLoading ? (
                <Skeleton
                    variant="rectangle"
                    style={{ borderRadius: 'var(--a-border-radius-medium)', lineHeight: '1.333' }}
                    height="2rem"
                    width="20rem"
                />
            ) : (
                <SelectMedSok name="Velg kontor dropdown" knappeTekst={`${valgtKontor?.kontorId} ${valgtKontor?.navn}`}>
                    <SokFilter data={alleKontor} label="" placeholder="Søk etter kontor">
                        {data => (
                            <FormikRadioGroup
                                defaultValue={alleKontor[0]?.kontorId}
                                data={data}
                                createLabel={(kontor: Kontor) => `${kontor.kontorId} ${kontor.navn}`}
                                createValue={(kontor: Kontor) => kontor.kontorId}
                                radioName="Velg kontor"
                                name={formikFieldName}
                            />
                        )}
                    </SokFilter>
                </SelectMedSok>
            )}
        </div>
    );
}

export default KontorDropdown;
