import * as React from 'react';
import '../arbeidsliste.less';
import { ReactComponentElement } from 'react';

interface ArbeidslisteikonProps {
    value: string;
    arbeidslisteikon: ReactComponentElement<any>;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ArbeidslisteIkon({ value, arbeidslisteikon, name, checked, onChange }: ArbeidslisteikonProps) {
    return (
        <label className="arbeidslisteikon__container" tabIndex={0}>
            <input
                type="radio"
                name={name}
                className="arbeidslisteikon__input"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {arbeidslisteikon}
        </label>
    );
}

export default ArbeidslisteIkon;
