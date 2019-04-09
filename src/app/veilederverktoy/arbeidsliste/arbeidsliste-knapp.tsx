import KnappFss from '../../components/knapp-fss/knapp-fss';
import React from 'react';
import { ReactComponent as ArbeidslisteIkon } from './arbeidsliste.svg';
import classNames from 'classnames';


export interface ArbeidslisteKnappProps {
    hidden: boolean;
    onClick: () => void;
    kanRedigereArbeidsliste: boolean;
    ifylldIkon: boolean;
}

function ArbeidslisteKnapp(props: ArbeidslisteKnappProps) {
    return (
        <KnappFss
            metricName={props.kanRedigereArbeidsliste ? 'rediger-arbeidsliste-trykket' : 'legg-i-arbeidsliste-trykket'} //TODO KANSKE FJERN?
            onClick={props.onClick}
            hidden={props.hidden}
        >
            <ArbeidslisteIkon className={classNames('knapp-fss__icon', {'icon--filled': props.ifylldIkon})}/>
            <span>Arbeidsliste</span>
        </KnappFss>
    );
}

export default ArbeidslisteKnapp;