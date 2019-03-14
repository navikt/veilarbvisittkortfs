import {Field, FieldProps} from "formik";
import React from "react";
import {Radio} from "nav-frontend-skjema";

interface FormikRadioFilterProps<T>{
    name: string;
    data: T[],
    radioName: string
    createLabel: (object: T) =>  string;
    createValue: (object: T) =>  string;
    closeDropdown: () => void;
    defaultValue?: string;
}

class FormikRadioGroup<T> extends React.Component<FormikRadioFilterProps<T>> {

    state = {
        defaultValue: this.props.defaultValue,
    };

    static getDerivedStateFromProps<T>(nextProps:FormikRadioFilterProps<T>, prevState: {defaultValue: string}){
        if(nextProps.defaultValue!==prevState.defaultValue){
            return { someStatesomeState: nextProps.defaultValue};
        }
        return null;
    }

    render() {
        const {name, data, radioName, createLabel, createValue, closeDropdown} = this.props;
        return (
            <Field name={name}>
                {({field, form}: FieldProps) => {

                    form.setFieldValue(field.name, this.state.defaultValue);

                    return (
                        <div className="visittkortfs-radio-filterform">
                            <div className="radio-filterform__valg scrollbar">
                                {data.map(o =>
                                    <Radio
                                        name={radioName}
                                        label={createLabel(o)}
                                        value={createValue(o)}
                                        id={`${createValue(o)}-${radioName}`}
                                        key={`${createValue(o)}-${radioName}`}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            form.setFieldValue(field.name, e.target.value);
                                            closeDropdown();
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )
                }}
            </Field>
        )
    }
}

export default FormikRadioGroup;