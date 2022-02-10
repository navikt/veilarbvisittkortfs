import React, { useState } from 'react';
import './sok-filter.less';
import { Input } from 'nav-frontend-skjema';
import { useFocus } from '../../../util/hook/use-focus';

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

function SokFilter<T>(props: SokFilterProps<T>) {
	const { focusRef } = useFocus();
	const [query, changeQuery] = useState('');
	const { data, limitSize, children } = props;
	const rawfilteredData = data.filter(
		elem => !query || JSON.stringify(elem).toLowerCase().includes(query.toLowerCase())
	);

	const filteredData = limitSize === undefined ? rawfilteredData : limit(rawfilteredData, limitSize || 20);

	return (
		<>
			<div className="sokfilter">
				<Input
					inputRef={inputRef => (focusRef.current = inputRef)}
					label={props.label}
					placeholder={props.placeholder}
					value={query}
					inputClassName="sokfilter__input"
					onChange={e => changeQuery(e.target.value)}
				/>
			</div>
			{children(filteredData)}
		</>
	);
}

export default SokFilter;
