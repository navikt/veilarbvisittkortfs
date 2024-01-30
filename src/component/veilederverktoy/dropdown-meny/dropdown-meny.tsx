import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import './dropdown-meny.less';
import { useDocumentEventListner } from '../../../util/hook/use-event-listner';
import { Button } from '@navikt/ds-react';
import { CogIcon } from '@navikt/aksel-icons';
import withClickMetric from '../../components/click-metric/click-metric';
import hiddenIf from '../../components/hidden-if/hidden-if';

/* tslint:disable */
const btnCls = (erApen: boolean, className: string | undefined) =>
    classNames('dropdownmeny', className, {
        'dropdownmeny--apen': erApen
    });

interface DropdownMenyProps {
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

function DropdownMeny(props: DropdownMenyProps) {
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
                icon={<CogIcon className="knapp-fss__icon" />}
                ref={btnRef}
                className={classNames('dropdownmeny__btn', props.btnClassnames)}
                onClick={toggleDropdown}
                aria-expanded={apen}
                aria-controls={`${name}-dropdownmeny__innhold`}
                aria-labelledby={props.ariaLabelledBy}
                type="button"
            >
                {knappeTekst}
            </Button>
            {apen && (
                <ul
                    className={'dropdownmeny__innhold'}
                    id={`${name}-dropdownmeny__innhold`}
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

export default withClickMetric(hiddenIf(DropdownMeny));
