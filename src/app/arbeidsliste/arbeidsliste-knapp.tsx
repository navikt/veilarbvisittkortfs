import React from 'react';
import { ReactComponent as ArbeidslisteIkon } from './arbeidsliste.svg';
import classNames from 'classnames';
import withClickMetric from '../components/click-metric/click-metric';
import KnappFss from '../components/knapp-fss/knapp-fss';

export interface ArbeidslisteKnappProps {
    hidden: boolean;
    onClick: () => void;
    kanRedigereArbeidsliste: boolean;
    ifylldIkon: boolean;
}

function ArbeidslisteKnapp(props: ArbeidslisteKnappProps) {
    return (
        <KnappFss className="arbeidsliste-knapp" onClick={props.onClick} hidden={props.hidden}>
            <ArbeidslisteIkon className={classNames('knapp-fss__icon', { 'icon--filled': props.ifylldIkon })} />
        </KnappFss>
    );
}

export default withClickMetric(ArbeidslisteKnapp);
