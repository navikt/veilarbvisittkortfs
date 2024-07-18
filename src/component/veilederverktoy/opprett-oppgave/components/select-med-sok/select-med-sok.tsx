import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import { Button } from '@navikt/ds-react';
import TannHjulIkon from '../../../tannhjul.svg?react';
import { useDocumentEventListner } from '../../../../../util/hook/use-event-listner';
import withClickMetric from '../../../../components/click-metric/click-metric';
import hiddenIf from '../../../../components/hidden-if/hidden-if';
import './select-med-sok.less';

const btnCls = (erApen: boolean) =>
    classNames('velg-enhet-dropdown', 'select-med-sok', {
        'select-med-sok--apen': erApen
    });

interface SelectMedSokProps {
    apen?: boolean;
    name: string;
    knappeTekst: ReactNode;
    render: (lukkDropdown: () => void) => ReactNode;
    onLukk?: () => void;
    onClick?: () => void;
    ariaLabelledBy?: string;
}

function harTrykktPaEsc(e: KeyboardEvent) {
    return e.keyCode === 27;
}

function SelectMedSok(props: SelectMedSokProps) {
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

    const { name, knappeTekst } = props;
    return (
        <div className={btnCls(apen)} ref={loggNode}>
            <Button
                variant="tertiary-neutral"
                icon={<TannHjulIkon className="knapp-fss__icon" />}
                ref={btnRef}
                className={classNames('select-med-sok__btn', 'velg-enhet-dropdown__button')}
                onClick={toggleDropdown}
                aria-expanded={apen}
                aria-controls={`${name}-select-med-sok__innhold`}
                aria-labelledby={props.ariaLabelledBy}
                type="button"
            >
                {knappeTekst}
            </Button>
            {apen && (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <ul
                    className={'select-med-sok__innhold'}
                    id={`${name}-select-med-sok__innhold`}
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

export default withClickMetric(hiddenIf(SelectMedSok));
