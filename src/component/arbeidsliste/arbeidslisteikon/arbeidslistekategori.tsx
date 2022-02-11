import React from 'react';
import { ReactComponentElement } from 'react';
import '../arbeidsliste.less';

interface ArbeidslistekategoriProps {
    value: string;
    arbeidslisteikon: ReactComponentElement<any>;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title?: string;
}

function Arbeidslistekategori({ value, arbeidslisteikon, name, checked, onChange, title }: ArbeidslistekategoriProps) {
    return (
        <div className="arbeidslistekategori__container">
            <input id={value} type="radio" name={name} value={value} checked={checked} onChange={onChange} />
            <label htmlFor={value} title={title}>
                {arbeidslisteikon}
            </label>
        </div>
    );
}

export default Arbeidslistekategori;
