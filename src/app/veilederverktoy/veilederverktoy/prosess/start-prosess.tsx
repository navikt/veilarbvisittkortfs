import React from 'react';
import classNames from 'classnames';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { HiddenIfHovedKnapp } from '../../../components/hidden-if/hidden-if-knapp';

interface StartProsessProps {
    tittelId: string;
    knappetekstId: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    hiddenKnapp?: boolean;
}

function StartProcess(props: StartProsessProps) {
    return (
        <article className={classNames('prosess gra-border', props.className)}>
            <Undertittel className="prosess_overskrift">
                <FormattedMessage id={props.tittelId} />
            </Undertittel>
            {props.children}
            <HiddenIfHovedKnapp
                onClick={props.onClick}
                aria-labelledby={props.tittelId}
                hidden={props.hiddenKnapp}
                className="btn--mb1"
            >
                <FormattedMessage id={props.knappetekstId}/>
            </HiddenIfHovedKnapp>
        </article>
    );
}

export default StartProcess;
