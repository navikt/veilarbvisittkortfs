import React, { RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './dropdown.less';
import withClickMetric from '../click-metric/click-metric';
import hiddenIf from '../hidden-if/hidden-if';

/* tslint:disable */
const btnCls = (erApen: boolean, className: string|undefined) =>
    classNames('dropdown', className, {
        'dropdown--apen': erApen,
    });

interface DropdownProps {
    apen?: boolean;
    name: string;
    knappeTekst: string;
    render: (lukkDropdown:()=>void, childNode: RefObject<HTMLElement>) => React.ReactNode;
    className?: string;
    onLukk?: () => void;
    onClick?: () => void;
    onClickOutSide?: () => void;
    btnClassnames?: string;
}

function Dropdown(props: DropdownProps) {
    const [apen, setApen] = useState(props.apen || false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const loggNode = useRef<HTMLDivElement>(null);
    const childNode = useRef(null);
    const {onLukk, onClickOutSide} = props;

    const lukkDropdown = useCallback(() => {
        if(apen) {
            setApen(false);
            btnRef.current && btnRef.current.focus();
            onLukk && onLukk();
        }
    },[onLukk, apen]);

    const eventHandler = useCallback((e: any) => {
        if (e.code === 'Escape' || (loggNode.current && !loggNode.current.contains(e.target))) {
            onClickOutSide && onClickOutSide();
            lukkDropdown();
        }
    },[lukkDropdown, onClickOutSide]);

    useEffect(()=> {
        document.body.addEventListener('click', eventHandler);
        document.body.addEventListener('keyup', eventHandler);
        return () => {
            document.body.removeEventListener('click', eventHandler);
            document.body.removeEventListener('keyup', eventHandler);
        }
    }, [eventHandler]);


    useLayoutEffect(()=> {
        if(apen) {
            if (childNode && childNode.current) {
                // @ts-ignore
                childNode.current.focus();
            }
        }
    },[apen]);

    function apneDropdown() {
        setApen(true);
    }

    function toggleDropdown() {
        if (apen) {
            lukkDropdown();
        } else {
            props.onClick && props.onClick();
            apneDropdown()
        }
    }

    const { name, className, knappeTekst } = props;
    return (
        <div className="dropdown">
            <div className={btnCls(apen, className)} ref={loggNode}>
                <button
                    ref={btnRef}
                    type="button"
                    className={classNames("dropdown__btn", props.btnClassnames)}
                    onClick={toggleDropdown}
                    aria-expanded={apen}
                    aria-controls={`${name}-dropdown__innhold`}
                >
                    {knappeTekst}
                </button>
                <div
                    hidden={!apen}
                    className={`${name}-dropdown__innhold dropdown__innhold`}
                    id={`${name}-dropdown__innhold`}
                >

                    {props.render(lukkDropdown, childNode)}
                </div>
            </div>
        </div>
    );
}

export default withClickMetric(hiddenIf(Dropdown));
