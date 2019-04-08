import KnappFss from '../../components/knapp-fss/knapp-fss';
import React from 'react';
import { ReactComponent as ArbeidslisteIkon } from './arbeidsliste.svg';
import classNames from 'classnames';

function ArbeidslisteKnapp(props: {hidden: boolean, onClick: () => void, kanRedigereArbeidsliste: boolean}) {
    return (
        <KnappFss
            metricName={props.kanRedigereArbeidsliste ? '' : 'legg-i-arbeidsliste-trykket'}
            onClick={props.onClick}
            hidden={props.hidden}
        >
            <ArbeidslisteIkon className={classNames('knapp-fss__icon', {'icon--filled': props.kanRedigereArbeidsliste})}/>
            <span>Arbeidsliste</span>
        </KnappFss>
    );
}

export default ArbeidslisteKnapp;