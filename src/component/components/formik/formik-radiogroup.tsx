import { useFormikContext } from 'formik';
import { Dropdown } from '@navikt/ds-react';

interface FormikRadioFilterProps<T> {
    name: string;
    data: T[];
    radioName: string;
    createLabel: (object: T) => string;
    createValue: (object: T) => string;
    defaultValue?: string;
}

function FormikRadioGroup<T>({ name, data, createLabel, createValue }: FormikRadioFilterProps<T>) {
    const { setFieldValue } = useFormikContext();
    return (
        <Dropdown.Menu.List>
            {data.map(option => {
                return (
                    <Dropdown.Menu.List.Item
                        onClick={() => {
                            setFieldValue(name, createValue(option));
                        }}
                        key={createValue(option)}
                    >
                        <p>{createLabel(option)}</p>
                    </Dropdown.Menu.List.Item>
                );
            })}
        </Dropdown.Menu.List>
    );
}

export default FormikRadioGroup;
