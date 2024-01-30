import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import './dropdown.less';
import withClickMetric from '../click-metric/click-metric';
import hiddenIf from '../hidden-if/hidden-if';
import { useDocumentEventListner } from '../../../util/hook/use-event-listner';
import { Button } from '@navikt/ds-react';
import { ReactComponent as TannHjulIkon } from '../../veilederverktoy/tannhjul.svg';

/* tslint:disable */
const btnCls = (erApen: boolean, className: string | undefined) =>
    classNames('dropdown', className, {
        'dropdown--apen': erApen
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

function Dropdown(props: DropdownProps) {
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
                className={classNames('dropdown__btn', props.btnClassnames)}
                onClick={toggleDropdown}
                aria-expanded={apen}
                aria-controls={`${name}-dropdown__innhold`}
                aria-labelledby={props.ariaLabelledBy}
                type="button"
            >
                {knappeTekst}
            </Button>
            {apen && (
                <ul
                    className={'dropdown__innhold'}
                    id={`${name}-dropdown__innhold`}
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

export default withClickMetric(hiddenIf(Dropdown));
