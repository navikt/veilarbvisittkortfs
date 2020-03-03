import * as React from 'react';
import '../arbeidsliste.less';
import { ReactComponentElement } from 'react';

interface ArbeidslisteikonProps {
    value: string;
    arbeidslisteikon: ReactComponentElement<any>;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title?: string;
}

function ArbeidslisteIkon({ value, arbeidslisteikon, name, checked, onChange, title }: ArbeidslisteikonProps) {
    return (
        <div className="arbeidslisteikon__container">
            <input id={value} type="radio" name={name} value={value} checked={checked} onChange={onChange} />
            <label htmlFor={value} title={title}>
                {arbeidslisteikon}
            </label>
        </div>
    );
}

export default ArbeidslisteIkon;
