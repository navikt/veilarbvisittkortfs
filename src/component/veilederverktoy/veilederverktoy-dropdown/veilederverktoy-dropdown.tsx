import { ReactNode, useRef } from 'react';
import classNames from 'classnames';
import { Button } from '@navikt/ds-react';
import { useDocumentEventListner } from '../../../util/hook/use-event-listner';
import TannHjulIkon from '../../veilederverktoy/tannhjul.svg?react';
import withClickMetric from '../../components/click-metric/click-metric';
import hiddenIf from '../../components/hidden-if/hidden-if';
import './veilederverktoy-dropdown.less';

interface DropdownProps {
    apen: boolean;
    setApen: (apen: boolean) => void;
    lukkDropdown: () => void;
    btnRef: React.RefObject<HTMLButtonElement>;
    render: (lukkDropdown: () => void) => ReactNode;
    onClick?: () => void;
}

function VeilederverktoyDropdown({ apen, setApen, lukkDropdown, btnRef, render, onClick }: DropdownProps) {
    const loggNode = useRef<HTMLDivElement>(null);

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
                icon={<TannHjulIkon className="veilederverktoy-ikon" aria-hidden={true} />}
                ref={btnRef}
                className="veilederverktoy-dropdown__btn"
                onClick={toggleDropdown}
                aria-expanded={apen}
                aria-controls="tildel-veileder-veilederverktoy-dropdown__innhold"
                type="button"
            >
                Veilederverktøy
            </Button>
            {apen && (
                <ul
                    className="veilederverktoy-dropdown__innhold"
                    id="tildel-veileder-veilederverktoy-dropdown__innhold"
                >
                    {render(lukkDropdown)}
                </ul>
            )}
        </div>
    );
}

export default withClickMetric(hiddenIf(VeilederverktoyDropdown));
