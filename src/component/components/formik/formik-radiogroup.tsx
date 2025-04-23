import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';
import { RadioGroup, Radio } from '@navikt/ds-react';

interface FormikRadioFilterProps<T> {
    name: string;
    data: T[];
    radioName: string;
    createLabel: (object: T) => string;
    createValue: (object: T) => string;
    defaultValue?: string;
}

function FormikRadioGroup<T>({
    name,
    data,
    radioName,
    createLabel,
    createValue,
    defaultValue
}: FormikRadioFilterProps<T>) {
    return (
        <Field name={name}>
            {({ field, form }: FieldProps) => {
                if (!field.value && defaultValue) {
                    form.setFieldValue(field.name, defaultValue);
                }
                return (
                    <div className="visittkortfs-radio-filterform">
                        <RadioGroup
                            className="radio-filterform__valg scrollbar"
                            size="small"
                            legend="Velg enhet"
                            hideLegend={true}
                        >
                            {data.map(o => {
                                const value = createValue(o);
                                return (
                                    <Radio
                                        size="small"
                                        name={radioName}
                                        value={value}
                                        id={`${value}-${radioName}`}
                                        key={`${value}-${radioName}`}
                                        checked={field.value === value}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            form.setFieldValue(field.name, e.target.value)
                                        }
                                    >
                                        {createLabel(o)}
                                    </Radio>
                                );
                            })}
                        </RadioGroup>
                    </div>
                );
            }}
        </Field>
    );
}

export default FormikRadioGroup;
