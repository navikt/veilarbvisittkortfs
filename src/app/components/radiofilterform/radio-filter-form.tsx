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
    onSubmit: (event: any) => void;
    data: T[];
    createLabel: (foo: T) => string;
    createValue: (foo: T) => string;
    radioName: string;
    closeDropdown: (event: any) => void;
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
        fjernNullstill,
        visLukkKnapp,
        ...rest
    } = props;

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => onSubmit({ event, value: selected, ...rest });

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
                    <HiddenIfKnapp
                        mini={true}
                        hidden={fjernNullstill}
                        htmlType="button"
                        onClick={event => {
                            changeSelected('');
                            onSubmit({ event, value: null, ...rest });
                        }}
                    >
                        Nullstill
                    </HiddenIfKnapp>
                </div>
            </form>
        </div>
    );
}

export default RadioFilterForm;