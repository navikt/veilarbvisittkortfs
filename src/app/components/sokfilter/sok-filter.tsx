import React from 'react';
import { Input } from 'nav-frontend-skjema';
import './sok-filter.less';

interface SokFilterProps<T> {
    data: T[];
    children: (filteredData: T[]) => React.ReactNode;
    label: string;
    placeholder: string;
    limitSize?: number;
    query?: string;
    changeQuery?: (val: string) => void;
}

function limit<T>(liste: T[], antall: number) {
    return liste.slice(0, antall);
}

function SokFilter<T> (props: SokFilterProps<T>) {

    const { data, limitSize, children} = props;
    const rawfilteredData = data.filter(elem => !props.query || JSON.stringify(elem).toLowerCase().includes(props.query.toLowerCase()));

    const filteredData =
        limitSize === undefined
            ? rawfilteredData
            : limit(rawfilteredData, limitSize || 20);

    return (
        <>
            <div className="sokfilter">
                <Input
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
