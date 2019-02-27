import * as React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Radio } from 'nav-frontend-skjema';
import { useState } from 'react';
import hiddenIf from '../hidden-if/hidden-if';
import './radio-filterform.less';

const HiddenIfKnapp = hiddenIf(Knapp);
const HiddenIfHovedknapp = hiddenIf(Hovedknapp);
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
        visLukkKnapp,
    } = props;

    const submitForm = (event: React.FormEvent<HTMLFormElement> ) => onSubmit(event, selected, props.closeDropdown);

    return (
        <div className="radio-filterform">
            <form onSubmit={submitForm}>
                <div className="radio-filterform__valg">
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
                <div className="knapperad--alignleft blokk-xxs">
                    <HiddenIfHovedknapp
                        mini={true}
                        hidden={visLukkKnapp && !selected}
                        htmlType="submit"
                        disabled={!selected}
                    >
                        Velg
                    </HiddenIfHovedknapp>
                    <HiddenIfKnapp
                        mini={true}
                        htmlType="button"
                        onClick={props.closeDropdown}
                        hidden={!visLukkKnapp || !!selected}
                    >
                        Lukk
                    </HiddenIfKnapp>
                </div>
            </form>
        </div>
    );
}

export default RadioFilterForm;