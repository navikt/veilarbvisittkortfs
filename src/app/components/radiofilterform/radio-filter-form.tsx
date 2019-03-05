import * as React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Radio } from 'nav-frontend-skjema';
import { useState } from 'react';
import './radio-filterform.less';

/* tslint:disable */

interface RadioFilterFormProps<T> {
    onSubmit: (event: React.FormEvent<HTMLFormElement>, value: string, closeDropdown: () => void) => void;
    data: T[];
    createLabel: (foo: T) => string;
    createValue: (foo: T) => string;
    radioName: string;
    closeDropdown: () => void;
    fjernNullstill?: boolean;
    visLukkKnapp?: boolean;
}

function RadioFilterForm<T> (props: RadioFilterFormProps<T>) {
    const [selected, changeSelected] = useState('');

    const {
        onSubmit,
        data,
        createLabel,
        createValue,
        radioName,
    } = props;

    const submitForm = (event: React.FormEvent<HTMLFormElement> ) => onSubmit(event, selected, props.closeDropdown);

    return (
        <div className="radio-filterform">
            <form onSubmit={submitForm}>
                <div className="radio-filterform__valg scrollbar">
                    {data.map(o =>
                        <Radio
                            name={radioName}
                            label={createLabel(o)}
                            value={createValue(o)}
                            id={`${createValue(o)}-${radioName}`}
                            key={`${createValue(o)}-${radioName}`}
                            onChange={e => changeSelected(e.target.value)}
                        />
                    )}
                </div>
                <div className="knapperad">
                    <Hovedknapp
                        mini={true}
                        className="radio-filterform__velg-knapp"
                        htmlType="submit"
                    >
                        Velg
                    </Hovedknapp>
                    <Knapp
                        mini={true}
                        htmlType="button"
                        className="radio-filterform__lukk-knapp"
                        onClick={props.closeDropdown}
                        hidden={false}
                    >
                        Lukk
                    </Knapp>
                </div>
            </form>
        </div>
    );
}

export default RadioFilterForm;
