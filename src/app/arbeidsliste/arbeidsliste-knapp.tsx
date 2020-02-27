import React from 'react';
import { ReactComponent as ArbeidslisteIkon } from './arbeidsliste.svg';
import classNames from 'classnames';
import { Flatknapp } from 'nav-frontend-knapper';

export interface ArbeidslisteKnappProps {
    hidden: boolean;
    onClick: () => void;
    kanRedigereArbeidsliste: boolean;
    ifylldIkon: boolean;
}

function ArbeidslisteKnapp(props: ArbeidslisteKnappProps) {
    return (
        <Flatknapp className="arbeidsliste-knapp" onClick={props.onClick} hidden={props.hidden}>
            <ArbeidslisteIkon
                className={classNames('arbeidsliste-knapp__icon', { 'icon--filled': props.ifylldIkon })}
            />
        </Flatknapp>
    );
}

export default ArbeidslisteKnapp;
