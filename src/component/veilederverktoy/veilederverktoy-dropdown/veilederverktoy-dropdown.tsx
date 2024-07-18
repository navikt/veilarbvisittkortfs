import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
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

function harTrykktPaEsc(e: KeyboardEvent) {
    return e.keyCode === 27;
}

function VeilederverktoyDropdown({ name, knappeTekst, render, onClick }: DropdownProps) {
    const [apen, setApen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const loggNode = useRef<HTMLDivElement>(null);

    const lukkDropdown = () => {
        if (apen) {
            setApen(false);
            btnRef.current && btnRef.current.focus();
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventHandler = (e: any) => {
        if (loggNode.current && !loggNode.current.contains(e.target)) {
            lukkDropdown();
        }
    };

    useDocumentEventListner('click', eventHandler);

    function apneDropdown() {
        setApen(true);
    }

    function toggleDropdown() {
        if (apen) {
            lukkDropdown();
        } else {
            onClick?.();
            apneDropdown();
        }
    }

    return (
        <div
            className={classNames('veilederverktoy-dropdown', { 'veilederverktoy-dropdown--apen': apen })}
            ref={loggNode}
        >
            <Button
                variant="tertiary-neutral"
                icon={<TannHjulIkon className="knapp-fss__icon" />}
                ref={btnRef}
                className="veilederverktoy-dropdown__btn knapp knapp--standard knapp-fss"
                onClick={toggleDropdown}
                aria-expanded={apen}
                aria-controls={`${name}-veilederverktoy-dropdown__innhold`}
                type="button"
            >
                {knappeTekst}
            </Button>
            {apen && (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <ul
                    className={'veilederverktoy-dropdown__innhold'}
                    id={`${name}-veilederverktoy-dropdown__innhold`}
                    onKeyDown={e => {
                        if (harTrykktPaEsc(e)) {
                            e.stopPropagation();
                            e.preventDefault();
                            lukkDropdown();
                        }
                    }}
                >
                    {render(lukkDropdown)}
                </ul>
            )}
        </div>
    );
}

export default withClickMetric(hiddenIf(VeilederverktoyDropdown));
