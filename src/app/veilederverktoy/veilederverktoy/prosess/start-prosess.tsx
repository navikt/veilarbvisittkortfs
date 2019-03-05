import React from 'react';
import classNames from 'classnames';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';

interface StartProsessProps {
    tittelId: string;
    knappetekstId: string;
    onClick: () => void;
    className: string;
    children: React.ReactNode;
    disabled?: boolean;
}

function StartProcess(props: StartProsessProps) {
    return (
        <article className={classNames('prosess', props.className)}>
            <Undertittel className="prosess_overskrift">
                <FormattedMessage id={props.tittelId} />
            </Undertittel>
            {props.children}
            <Hovedknapp
                onClick={props.onClick}
                aria-labelledby={props.tittelId}
                disabled={props.disabled}
            >
                <FormattedMessage id={props.knappetekstId} />
            </Hovedknapp>
        </article>
    );
}

export default StartProcess;
