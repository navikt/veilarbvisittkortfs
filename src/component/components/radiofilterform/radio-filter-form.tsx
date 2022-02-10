import React from 'react';
import { Radio } from 'nav-frontend-skjema';
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
							label={createLabel(o)}
							value={value}
							id={`${value}-${radioName}`}
							key={`${value}-${radioName}`}
							checked={value === props.selected}
							onChange={e => props.changeSelected(e)}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default RadioFilterForm;
