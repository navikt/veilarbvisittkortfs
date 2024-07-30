import { ChangeEvent } from 'react';
import { Radio, RadioGroup } from '@navikt/ds-react';
import './radio-filterform.less';

interface Props<T> {
    data: T[];
    createLabel: (foo: T) => string;
    createValue: (foo: T) => string;
    radioName: string;
    selected: string;
    changeSelected: (e: ChangeEvent<HTMLInputElement>) => void;
}

function RadioFilterForm<T>({ data, createLabel, createValue, radioName, selected, changeSelected }: Props<T>) {
    return (
        <div className="radio-filterform">
            <RadioGroup legend="tildel_veileder" hideLegend={true} className="radio-filterform__valg scrollbar">
                {data.map(o => {
                    const value = createValue(o);
                    return (
                        <Radio
                            name={radioName}
                            value={value}
                            id={`${value}-${radioName}`}
                            key={`${value}-${radioName}`}
                            checked={value === selected}
                            onChange={e => changeSelected(e)}
                            size="small"
                        >
                            {createLabel(o)}
                        </Radio>
                    );
                })}
            </RadioGroup>
        </div>
    );
}

export default RadioFilterForm;
