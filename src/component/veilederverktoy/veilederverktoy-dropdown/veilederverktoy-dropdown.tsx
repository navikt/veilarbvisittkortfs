import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import './veilederverktoy-dropdown.less';
import { useDocumentEventListner } from '../../../util/hook/use-event-listner';
import { Button } from '@navikt/ds-react';
import TannHjulIkon from '../../veilederverktoy/tannhjul.svg?react';
import withClickMetric from '../../components/click-metric/click-metric';
import hiddenIf from '../../components/hidden-if/hidden-if';

/* tslint:disable */
const btnCls = (erApen: boolean, className: string | undefined) =>
    classNames('veilederverktoy-dropdown', className, {
        'veilederverktoy-dropdown--apen': erApen
    });

interface DropdownProps {
    apen?: boolean;
    name: string;
    knappeTekst: ReactNode;
    render: (lukkDropdown: () => void) => ReactNode;
    className?: string;
    onLukk?: () => void;
    onClick?: () => void;
    btnClassnames?: string;
    ariaLabelledBy?: string;
}

function harTrykktPaEsc(e: KeyboardEvent) {
    return e.keyCode === 27;
}

function VeilederverktoyDropdown(props: DropdownProps) {
    const [apen, setApen] = useState(props.apen || false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const loggNode = useRef<HTMLDivElement>(null);
    const { onLukk } = props;

    const lukkDropdown = () => {
        if (apen) {
            setApen(false);
            btnRef.current && btnRef.current.focus();
            onLukk && onLukk();
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
            props.onClick && props.onClick();
            apneDropdown();
        }
    }

    const { name, className, knappeTekst } = props;
    return (
        <div className={btnCls(apen, className)} ref={loggNode}>
            <Button
                variant="tertiary-neutral"
                icon={<TannHjulIkon className="knapp-fss__icon" />}
                ref={btnRef}
                className={classNames('veilederverktoy-dropdown__btn', props.btnClassnames)}
                onClick={toggleDropdown}
                aria-expanded={apen}
                aria-controls={`${name}-veilederverktoy-dropdown__innhold`}
                aria-labelledby={props.ariaLabelledBy}
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
                    {props.render(lukkDropdown)}
                </ul>
            )}
        </div>
    );
}

export default withClickMetric(hiddenIf(VeilederverktoyDropdown));
