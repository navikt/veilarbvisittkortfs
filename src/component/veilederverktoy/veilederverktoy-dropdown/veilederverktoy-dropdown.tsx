import { ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import { Button } from '@navikt/ds-react';
import './veilederverktoy-dropdown.less';
import { useDocumentEventListner } from '../../../util/hook/use-event-listner';
import TannHjulIkon from '../../veilederverktoy/tannhjul.svg?react';
import withClickMetric from '../../components/click-metric/click-metric';
import hiddenIf from '../../components/hidden-if/hidden-if';

interface DropdownProps {
    name: string;
    knappeTekst: ReactNode;
    render: (lukkDropdown: () => void) => ReactNode;
    onClick?: () => void;
}

function VeilederverktoyDropdown({ name, knappeTekst, render, onClick }: DropdownProps) {
    const [apen, setApen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const loggNode = useRef<HTMLDivElement>(null);

    const lukkDropdown = () => {
        if (apen) {
            setApen(false);
            btnRef.current?.focus();
        }
    };

    function toggleDropdown() {
        if (apen) {
            lukkDropdown();
        } else {
            onClick?.();
            setApen(true);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventHandler = (e: any) => {
        if (loggNode.current && !loggNode.current.contains(e.target)) {
            lukkDropdown();
        }
    };

    useDocumentEventListner('click', eventHandler);

    return (
        <div
            className={classNames('veilederverktoy-dropdown', { 'veilederverktoy-dropdown--apen': apen })}
            ref={loggNode}
        >
            <Button
                variant="tertiary-neutral"
                icon={<TannHjulIkon className="veilederverktoy-ikon" />}
                ref={btnRef}
                className="veilederverktoy-dropdown__btn"
                onClick={toggleDropdown}
                aria-expanded={apen}
                aria-controls={`${name}-veilederverktoy-dropdown__innhold`}
                type="button"
            >
                {knappeTekst}
            </Button>
            {apen && (
                <ul className={'veilederverktoy-dropdown__innhold'} id={`${name}-veilederverktoy-dropdown__innhold`}>
                    {render(lukkDropdown)}
                </ul>
            )}
        </div>
    );
}

export default withClickMetric(hiddenIf(VeilederverktoyDropdown));
