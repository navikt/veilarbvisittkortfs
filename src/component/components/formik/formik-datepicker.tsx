import { Field, FieldProps } from 'formik';
import { DatePicker, useDatepicker, DateInputProps } from '@navikt/ds-react';
import { toReversedDateStr } from '../../../util/date-utils';
import { getErrors } from './formik-utils';

interface FormikDatepickerProps {
    name: string;
    validate: (value: string) => string | undefined;
    label: string;
    ariaLabel: string;
    size?: DateInputProps['size'];
    className?: string;
}

interface DatoVelgerProps {
    formikProps: FieldProps;
    ariaLabel: string;
    size: DateInputProps['size'];
    label: string;
    name: string;
    error?: string;
}

const DatoVelger = ({ formikProps, ariaLabel, size, label, name, error }: DatoVelgerProps) => {
    const {
        field,
        form: { setFieldValue }
    } = formikProps;
    const { inputProps, datepickerProps } = useDatepicker({
        defaultSelected: field.value ? new Date(field.value) : undefined,
        inputFormat: 'dd.MM.yyyy',
        onDateChange: (date?: Date) => {
            setFieldValue(field.name, date ? toReversedDateStr(date) : null);
        }
    });

    const datepickerInputProps = {
        ...inputProps,
        id: name,
        name,
        placeholder: 'dd.mm.åååå',
        'aria-label': ariaLabel
    };

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input size={size} label={label} error={error} {...datepickerInputProps} />
        </DatePicker>
    );
};

const FormikDatoVelger = ({ name, validate, label, ariaLabel, size = 'medium', className }: FormikDatepickerProps) => (
    <Field validate={validate} name={name} id={name}>
        {(formProps: FieldProps) => {
            const feil = getErrors(formProps.form.errors, formProps.form.touched, name);
            const datePickerClassName = ['skjemaelement datovelger', className].filter(Boolean).join(' ');

            return (
                <div className={datePickerClassName}>
                    <DatoVelger
                        formikProps={formProps}
                        ariaLabel={ariaLabel}
                        size={size}
                        label={label}
                        name={name}
                        error={feil?.feilmelding}
                    />
                </div>
            );
        }}
    </Field>
);

export default FormikDatoVelger;
