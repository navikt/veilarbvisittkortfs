import { Radio } from '@navikt/ds-react';
import React from 'react';
import './radio-filterform.less';

export interface RadioFilterFormProps<T> {
    data: T[];
    createLabel: (foo: T) => string;
    createValue: (foo: T) => string;
    radioName: string;
    fjernNullstill?: boolean;
    selected: string;
    changeSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RadioFilterForm<T>(props: RadioFilterFormProps<T>) {
    const { data, createLabel, createValue, radioName } = props;
    return (
        <div className="radio-filterform">
            <div className="radio-filterform__valg scrollbar">
                {data.map(o => {
                    const value = createValue(o);
                    return (
                        <Radio
                            name={radioName}
                            value={value}
                            id={`${value}-${radioName}`}
                            key={`${value}-${radioName}`}
                            checked={value === props.selected}
                            onChange={e => props.changeSelected(e)}
                        >{createLabel(o)}</Radio>
                    );
                })}
            </div>
        </div>
    );
}

export default RadioFilterForm;
