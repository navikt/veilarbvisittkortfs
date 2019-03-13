import * as React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Radio } from 'nav-frontend-skjema';
import './radio-filterform.less';

/* tslint:disable */

export interface RadioFilterFormProps<T> {
    data: T[];
    createLabel: (foo: T) => string;
    createValue: (foo: T) => string;
    radioName: string;
    closeDropdown: () => void;
    fjernNullstill?: boolean;
    visLukkKnapp?: boolean;
    selected: string;
    changeSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RadioFilterForm<T> (props: RadioFilterFormProps<T>) {
    const {
        data,
        createLabel,
        createValue,
        radioName,
        visLukkKnapp,
    } = props;

    return (
        <div className="radio-filterform">
                <div className="radio-filterform__valg scrollbar">
                    {data.map(o =>
                        <Radio
                            name={radioName}
                            label={createLabel(o)}
                            value={createValue(o)}
                            id={`${createValue(o)}-${radioName}`}
                            key={`${createValue(o)}-${radioName}`}
                            onChange={e => props.changeSelected(e)}
                        />
                    )}
                </div>
                <div className="knapperad">
                    <Hovedknapp
                        hidden={visLukkKnapp && !props.selected}
                        htmlType="submit"
                        disabled={!props.selected}
                        onClick={props.closeDropdown}
                    >
                        Velg
                    </Hovedknapp>
                    <Knapp
                        htmlType="button"
                        onClick={props.closeDropdown}
                    >
                        Lukk
                    </Knapp>
                </div>
        </div>
    );
}

export default RadioFilterForm;
