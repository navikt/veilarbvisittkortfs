import { ReactNode } from 'react';
import { Button, Dropdown } from '@navikt/ds-react';
import withClickMetric from '../../../../components/click-metric/click-metric';
import './select-med-sok.less';

interface SelectMedSokProps {
    knappeTekst: ReactNode;
    onClick?: () => void;
    children: ReactNode;
    description?: string;
}

function DropdownMedSokeFilter({ knappeTekst, children }: SelectMedSokProps) {
    return (
        <div className="select-med-sok">
            <Dropdown
                onSelect={element => {
                    element.preventDefault(); // Dont submit form on select
                }}
                closeOnSelect
            >
                <Button as={Dropdown.Toggle} variant="tertiary-neutral" className="select-med-sok__btn" type="button">
                    {knappeTekst}
                </Button>
                <Dropdown.Menu>{children}</Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default withClickMetric(DropdownMedSokeFilter);
