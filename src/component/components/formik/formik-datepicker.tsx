import React from 'react';
import { Field, FieldProps, getIn } from 'formik';
import { ErrorMessage, DatePicker, useDatepicker } from '@navikt/ds-react';
import classNames from 'classnames';

interface FormikDatepickerProps {
    name: string;
    validate: (value: string) => string | undefined;
    label: string;
    ariaLabel: string;
    size?: 'medium' | 'small';
    className?: string;
}

function FormikDatoVelger({ name, validate, label, ariaLabel, size = 'medium', className }: FormikDatepickerProps) {
    const { inputProps, datepickerProps } = useDatepicker!({});
    return (
        <Field validate={validate} name={name} id={name}>
            {({ field, form: { errors, setFieldValue } }: FieldProps) => {
                const error = getIn(errors, name);
                const datePickerClassName = classNames('skjemaelement datovelger', className, {
                    'datovelger--harFeil': error
                });
                return (
                    <div className={datePickerClassName}>
                        <DatePicker
                            {...datepickerProps}
                            defaultValue={field.value}
                            onSelect={(date?: any) => setFieldValue(field.name, date)}
                        >
                            <DatePicker.Input
                                size={size}
                                label={label}
                                {...{
                                    ...inputProps,
                                    ...({
                                        id: name,
                                        name,
                                        placeholder: 'dd.mm.åååå',
                                        'aria-label': ariaLabel
                                    } as any)
                                }}
                            />
                        </DatePicker>
                        {error && <ErrorMessage size="small">{error}</ErrorMessage>}
                    </div>
                );
            }}
        </Field>
    );
}

export default FormikDatoVelger;
