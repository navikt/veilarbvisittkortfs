import React from 'react';
import './sok-filter.less';
import { Input } from 'nav-frontend-skjema';

interface SokFilterProps<T> {
    data: T[];
    children: (filteredData: T[]) => React.ReactNode;
    label: string;
    placeholder: string;
    limitSize?: number;
    query?: string;
    changeQuery?: (val: string) => void;
    settRef?: any;
}

function limit<T>(liste: T[], antall: number) {
    return liste.slice(0, antall);
}

function SokFilter<T> (props: SokFilterProps<T>) {

    const { data, limitSize, children, query} = props;
    const rawfilteredData = data.filter(elem => !query || JSON.stringify(elem).toLowerCase().includes(query.toLowerCase()));

    const filteredData =
        limitSize === undefined
            ? rawfilteredData
            : limit(rawfilteredData, limitSize || 20);

    return (
        <>
            <div className="sokfilter">
                <Input
                    inputRef={props.settRef}
                    label={props.label}
                    placeholder={props.placeholder}
                    value={props.query}
                    inputClassName="sokfilter__input"
                    onChange={e => props.changeQuery && props.changeQuery(e.target.value)}
                />
            </div>
            {children(filteredData)}
        </>
    );
}

export default SokFilter;
