import { Skeleton, UNSAFE_Combobox as Combobox } from '@navikt/ds-react';
import { OrNothing, StringOrNothing } from '../../../../util/type/utility-types';
import { Kontor } from '../../../../api/ao-oppfolgingskontor';
import { useFormikContext } from 'formik';

interface KontorDropdownProps {
    label?: string | undefined;
    description?: string | undefined;
    valgtKontorId: StringOrNothing;
    alleKontor: Kontor[];
    isLoading: boolean;
    formikFieldName: 'enhetId' | 'kontorId';
}

const kontorNavn = (kontor: { kontorId: string; kontorNavn: string }) => {
    return `${kontor?.kontorId} ${kontor?.kontorNavn}`;
};

function KontorDropdown({
    alleKontor,
    isLoading,
    formikFieldName,
    valgtKontorId,
    description,
    label
}: KontorDropdownProps) {
    const valgtKontor: OrNothing<Kontor> =
        alleKontor.find(kontor => kontor.kontorId === valgtKontorId) || alleKontor[0];
    const formikProps = useFormikContext<KontorDropdownProps>();

    return (
        <div className="">
            {isLoading ? (
                <Skeleton
                    variant="rectangle"
                    style={{ borderRadius: 'var(--a-border-radius-medium)', lineHeight: '1.333' }}
                    height="2rem"
                    width="20rem"
                />
            ) : (
                <Combobox
                    onToggleSelected={value => {
                        return formikProps.setFieldValue(formikFieldName, value);
                    }}
                    label={label || 'Velg kontor'}
                    description={description}
                    name={formikFieldName}
                    placeholder={kontorNavn(valgtKontor)}
                    options={alleKontor.map(kontor => ({
                        label: kontorNavn(kontor),
                        value: kontor.kontorId
                    }))}
                />
            )}
        </div>
    );
}

export default KontorDropdown;
