import * as React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Radio } from 'nav-frontend-skjema';
import hiddenIf from '../hidden-if/hidden-if';
import './radio-filterform.less';

const HiddenIfKnapp = hiddenIf(Knapp);
const HiddenIfHovedknapp = hiddenIf(Hovedknapp);
/* tslint:disable */

interface RadioFilterFormProps<T> {
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
                <div className="radio-filterform__valg">
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
                <div className="knapperad--alignleft blokk-xxs">
                    <HiddenIfHovedknapp
                        mini={true}
                        hidden={visLukkKnapp && !props.selected}
                        htmlType="submit"
                        disabled={!props.selected}
                    >
                        Velg
                    </HiddenIfHovedknapp>
                    <HiddenIfKnapp
                        mini={true}
                        htmlType="button"
                        onClick={props.closeDropdown}
                        hidden={!visLukkKnapp || !!props.selected}
                    >
                        Lukk
                    </HiddenIfKnapp>
                </div>
        </div>
    );
}

export default RadioFilterForm;