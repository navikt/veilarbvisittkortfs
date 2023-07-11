import React from 'react';
import { Field, FieldProps, getIn } from 'formik';
import classNames from 'classnames';
import { ErrorMessage, DatePicker, useDatepicker } from '@navikt/ds-react';

interface FormikDatepickerProps {
    name: string;
    validate: (value: string) => string | undefined;
    label: string;
    ariaLabel: string;
    className?: string;
}

function FormikDatoVelger({ name, validate, label, ariaLabel, className }: FormikDatepickerProps) {
    const { inputProps, datepickerProps } = useDatepicker({});

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
                            onSelect={(date?: Date) => setFieldValue(field.name, date?.toString())}
                        >
                            <DatePicker.Input
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
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </div>
                );
            }}
        </Field>
    );
}

export default FormikDatoVelger;
