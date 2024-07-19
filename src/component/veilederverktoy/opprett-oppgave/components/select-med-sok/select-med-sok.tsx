import { ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import { Button } from '@navikt/ds-react';
import { useDocumentEventListner } from '../../../../../util/hook/use-event-listner';
import withClickMetric from '../../../../components/click-metric/click-metric';
import hiddenIf from '../../../../components/hidden-if/hidden-if';
import './select-med-sok.less';

interface SelectMedSokProps {
    name: string;
    knappeTekst: ReactNode;
    render: (lukkDropdown: () => void) => ReactNode;
    onClick?: () => void;
}

function SelectMedSok({ name, knappeTekst, render, onClick }: SelectMedSokProps) {
    const [apen, setApen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const loggNode = useRef<HTMLDivElement>(null);

    const lukkSelect = () => {
        if (apen) {
            setApen(false);
            btnRef.current?.focus();
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventHandler = (e: any) => {
        if (loggNode.current && !loggNode.current.contains(e.target)) {
            lukkSelect();
        }
    };

    useDocumentEventListner('click', eventHandler);

    function toggleSelect() {
        if (apen) {
            lukkSelect();
        } else {
            onClick?.();
            setApen(true);
        }
    }

    return (
        <div className={classNames('select-med-sok', { 'select-med-sok--apen': apen })} ref={loggNode}>
            <Button
                variant="tertiary-neutral"
                ref={btnRef}
                className="select-med-sok__btn"
                onClick={toggleSelect}
                aria-expanded={apen}
                aria-controls={`${name}-select-med-sok__innhold`}
                type="button"
            >
                {knappeTekst}
            </Button>
            {apen && (
                <ul className={'select-med-sok__innhold'} id={`${name}-select-med-sok__innhold`}>
                    {render(lukkSelect)}
                </ul>
            )}
        </div>
    );
}

export default withClickMetric(hiddenIf(SelectMedSok));
