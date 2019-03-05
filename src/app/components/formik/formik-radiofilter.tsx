import {Field, FieldProps} from "formik";
import React from "react";
import RadioFilterForm, {RadioFilterFormProps} from "../radiofilterform/radio-filter-form";
import {Omit} from "../../../types/omit-type";

interface FormikRadioFilterProps<T>{
    name: string;
}

type OmitProps = "selected" | "changeSelected"


function FormikRadioFilter<T> ( {name, ...rest}: FormikRadioFilterProps<T> & Omit<RadioFilterFormProps<T>, OmitProps>) {
    return (
        <Field name={name}>
            {({ field, form: {setFieldValue}}: FieldProps)  =>
                <RadioFilterForm
                    selected={field.value}
                    changeSelected={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(field.name, e.target.value)}
                    visLukkKnapp={true}
                    {...rest}
                />

            }
        </Field>
    )
}

export default FormikRadioFilter;