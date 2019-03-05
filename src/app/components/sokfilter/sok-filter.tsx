import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
/* tslint:disable */
interface SokFilterProps<T> {
    data: T[];
    children: (filteredData: T[]) => React.ReactNode;
    label: string;
    placeholder: string;
    limitSize?: number;
}

function limit<T>(liste: T[], antall: number) {
    return liste.slice(0, antall);
}

function SokFilter<T> (props: SokFilterProps<T>) {
    const [query, changeQuery] = useState('');

    const { data, limitSize, children} = props;
    const rawfilteredData = data.filter(elem => !query || JSON.stringify(elem).toLowerCase().includes(query.toLowerCase()));

    const filteredData =
        limitSize === undefined
            ? rawfilteredData
            : limit(rawfilteredData, limitSize || 20);

    return (
        <div>
            <div className="sokfilter">
                <Input
                    label={props.label}
                    placeholder={props.placeholder}
                    value={query}
                    onChange={e => changeQuery(e.target.value)}
                />
            </div>
            {children(filteredData)}
        </div>
    );
}

export default SokFilter;