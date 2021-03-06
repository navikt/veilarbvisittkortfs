import { Field, FieldProps } from 'formik';
import React from 'react';
import { Radio } from 'nav-frontend-skjema';

interface FormikRadioFilterProps<T> {
    name: string;
    data: T[];
    radioName: string;
    createLabel: (object: T) => string;
    createValue: (object: T) => string;
    closeDropdown: () => void;
    defaultValue?: string;
}

function FormikRadioGroup<T>({
    name,
    data,
    radioName,
    createLabel,
    createValue,
    defaultValue,
}: FormikRadioFilterProps<T>) {
    return (
        <Field name={name}>
            {({ field, form }: FieldProps) => {
                if (!field.value && defaultValue) {
                    form.setFieldValue(field.name, defaultValue);
                }
                return (
                    <div className="visittkortfs-radio-filterform">
                        <div className="radio-filterform__valg scrollbar">
                            {data.map((o) => {
                                const value = createValue(o);
                                return (
                                    <Radio
                                        name={radioName}
                                        label={createLabel(o)}
                                        value={value}
                                        id={`${value}-${radioName}`}
                                        key={`${value}-${radioName}`}
                                        checked={field.value === value}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            form.setFieldValue(field.name, e.target.value)
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            }}
        </Field>
    );
}

export default FormikRadioGroup;
