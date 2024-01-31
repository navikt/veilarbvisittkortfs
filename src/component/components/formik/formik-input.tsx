import { ReactElement } from 'react';
import { Field, FieldProps } from 'formik';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import { getErrors } from './formik-utils';
import './formik.less';

interface FormikInputProps {
    name: string;
    validate: (value: string) => string | undefined;
    label: string;
}

function FormikInput({
    name,
    validate,
    ...inputProps
}: FormikInputProps & TextFieldProps): ReactElement<FieldProps & TextFieldProps> {
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                const feil = getErrors(form.errors, form.touched, name);
                return (
                    <TextField
                        className="formik-input"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        error={feil && feil.feilmelding}
                        value={field.value}
                        size="small"
                        {...inputProps}
                    />
                );
            }}
        </Field>
    );
}

export default FormikInput;
