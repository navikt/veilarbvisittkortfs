import React from 'react';
import { Field, FieldProps, getIn } from 'formik';
import { ErrorMessage, DatePicker, useDatepicker } from '@navikt/ds-react';
import classNames from 'classnames';
import { toReversedDateStr } from '../../../util/date-utils';
import { useDataStore } from '../../../store/data-store';

interface FormikDatepickerProps {
    name: string;
    validate: (value: string) => string | undefined;
    label: string;
    ariaLabel: string;
    size?: 'medium' | 'small';
    className?: string;
}

interface DatoVelgerProps {
    formikProps: FieldProps;
    ariaLabel: string;
    size: string;
    label: string;
    name: string;
}

const DatoVelgerHuskelapp = ({ formikProps, ariaLabel, size, label, name }: DatoVelgerProps) => {
    const { setVisFeilHuskelapp } = useDataStore();
    const {
        field,
        form: { setFieldValue }
    } = formikProps;
    const { inputProps, datepickerProps } = useDatepicker({
        defaultSelected: field.value ? new Date(field.value) : undefined,
        inputFormat: 'dd.MM.yyyy',
        onDateChange: (date?: any) => {
            setFieldValue(field.name, date ? toReversedDateStr(date) : null);
            setVisFeilHuskelapp(false);
        }
    });

    return (
        <DatePicker {...datepickerProps}>
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
    );
};

const FormikDatoVelgerHuskelapp = ({
    name,
    validate,
    label,
    ariaLabel,
    size = 'medium',
    className
}: FormikDatepickerProps) => (
    <Field validate={validate} name={name} id={name}>
        {(formProps: FieldProps) => {
            const error = getIn(formProps.form.errors, name);
            const datePickerClassName = classNames('skjemaelement datovelger', className, {
                'datovelger--harFeil': error
            });

            return (
                <div className={datePickerClassName}>
                    <DatoVelgerHuskelapp
                        formikProps={formProps}
                        ariaLabel={ariaLabel}
                        size={size}
                        label={label}
                        name={name}
                    />
                    {error && <ErrorMessage size="small">{error}</ErrorMessage>}
                </div>
            );
        }}
    </Field>
);

export default FormikDatoVelgerHuskelapp;
