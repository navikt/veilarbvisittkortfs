import { Skeleton } from '@navikt/ds-react';
import { OrNothing, StringOrNothing } from '../../../../util/type/utility-types';
import { Kontor } from '../../../../api/ao-oppfolgingskontor';
import FormikDropdown from '../../../components/formik/formik-dropdown';
import SokFilter from '../../../components/sokfilter/sok-filter';
import DropdownMedSokeFilter from './select-med-sok/dropdown-med-soke-filter';

interface KontorDropdownProps {
    valgtKontorId: StringOrNothing;
    alleKontor: Kontor[];
    isLoading: boolean;
    formikFieldName: 'enhetId' | 'kontorId';
}

function KontorDropdown({ alleKontor, isLoading, formikFieldName, valgtKontorId }: KontorDropdownProps) {
    const valgtKontor: OrNothing<Kontor> =
        alleKontor.find(kontor => kontor.kontorId === valgtKontorId) || alleKontor[0];

    return (
        <div className="skjemaelement navds-form-field navds-form-field--medium navds-date__field">
            {isLoading ? (
                <Skeleton
                    variant="rectangle"
                    style={{ borderRadius: 'var(--a-border-radius-medium)', lineHeight: '1.333' }}
                    height="2rem"
                    width="20rem"
                />
            ) : (
                <DropdownMedSokeFilter
                    name="Velg kontor dropdown"
                    knappeTekst={`${valgtKontor?.kontorId} ${valgtKontor?.navn}`}
                >
                    <SokFilter data={alleKontor} label="" placeholder="Søk etter kontor">
                        {data => (
                            <FormikDropdown
                                defaultValue={alleKontor[0]?.kontorId}
                                data={data}
                                createLabel={(kontor: Kontor) => `${kontor.kontorId} ${kontor.navn}`}
                                createValue={(kontor: Kontor) => kontor.kontorId}
                                radioName="Velg kontor"
                                name={formikFieldName}
                            />
                        )}
                    </SokFilter>
                </DropdownMedSokeFilter>
            )}
        </div>
    );
}

export default KontorDropdown;
