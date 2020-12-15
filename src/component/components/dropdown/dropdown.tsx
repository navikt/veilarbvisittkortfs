import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import './dropdown.less';
import withClickMetric from '../click-metric/click-metric';
import hiddenIf from '../hidden-if/hidden-if';
import { useDocumentEventListner } from '../../../util/hook/use-event-listner';

/* tslint:disable */
const btnCls = (erApen: boolean, className: string | undefined) =>
    classNames('dropdown', className, {
        'dropdown--apen': erApen,
    });

interface DropdownProps {
    apen?: boolean;
    name: string;
    knappeTekst: React.ReactNode;
    render: (lukkDropdown: () => void) => React.ReactNode;
    className?: string;
    onLukk?: () => void;
    onClick?: () => void;
    btnClassnames?: string;
    ariaLabelledBy?: string;
}

function harTrykktPaEsc(e: React.KeyboardEvent) {
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
        <div className="dropdown">
            <div className={btnCls(apen, className)} ref={loggNode}>
                <button
                    ref={btnRef}
                    type="button"
                    className={classNames('dropdown__btn', props.btnClassnames)}
                    onClick={toggleDropdown}
                    aria-expanded={apen}
                    aria-controls={`${name}-dropdown__innhold`}
                    aria-labelledby={props.ariaLabelledBy}
                >
                    {knappeTekst}
                </button>
                {apen && (
                    <ul
                        className={'dropdown__innhold dropdown__innhold'}
                        id={`${name}-dropdown__innhold`}
                        onKeyDown={(e) => {
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
        </div>
    );
}

export default withClickMetric(hiddenIf(Dropdown));
