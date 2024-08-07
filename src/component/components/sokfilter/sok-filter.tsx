import { ReactNode, useState } from 'react';
import { TextField } from '@navikt/ds-react';
import { useFocus } from '../../../util/hook/use-focus';
import './sok-filter.less';

interface SokFilterProps<T> {
    label: string;
    placeholder: string;
    data: T[];
    children: (filteredData: T[]) => ReactNode;
    limitSize?: number;
}

function limit<T>(liste: T[], antall: number) {
    return liste.slice(0, antall);
}

function SokFilter<T>({ label, placeholder, data, children, limitSize }: SokFilterProps<T>) {
    const { focusRef } = useFocus();
    const [query, changeQuery] = useState('');

    const rawfilteredData = data.filter(
        elem => !query || JSON.stringify(elem).toLowerCase().includes(query.toLowerCase())
    );

    const filteredData = limitSize === undefined ? rawfilteredData : limit(rawfilteredData, limitSize || 20);

    return (
        <>
            <div className="sokfilter">
                <TextField
                    ref={inputRef => (focusRef.current = inputRef)}
                    label={label}
                    placeholder={placeholder}
                    value={query}
                    size="small"
                    className="sokfilter__input"
                    onChange={e => changeQuery(e.target.value)}
                />
            </div>
            {children(filteredData)}
        </>
    );
}

export default SokFilter;
