import { Textarea, TextareaProps } from '@navikt/ds-react';
import { Field, FieldProps } from 'formik';
import { getErrors } from './formik-utils';
import './formik.less';

interface TekstAreaProps {
    name: string;
    validate?: (value: string) => string | undefined;
    label: string;
}

type OmitProps = 'onChange' | 'value' | 'feil' | 'onBlur' | 'label';

function FormikTekstArea({
    name,
    validate,
    label,
    size = 'medium',
    ...textAreaProps
}: TekstAreaProps & Omit<TextareaProps, OmitProps>) {
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                const feil = getErrors(form.errors, form.touched, name);
                return (
                    <Textarea
                        className="formik-textarea"
                        id={name}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        value={field.value}
                        error={feil && feil.feilmelding}
                        label={label}
                        size={size}
                        {...textAreaProps}
                    />
                );
            }}
        </Field>
    );
}

export default FormikTekstArea;
