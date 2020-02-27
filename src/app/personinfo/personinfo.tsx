import * as React from 'react';
import NavnOgAlder from './components/navnogalder';
import './personinfo.less';
import Icon from './components/icon';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../types/appstate';
import PersonaliaSelector from '../../store/personalia/selectors';
import ArbeidslisteKnapp from '../arbeidsliste/arbeidsliste-knapp';
import ArbeidslisteSelector from '../../store/arbeidsliste/selector';
import { navigerAction } from '../../store/navigation/actions';
import { KopierKnappTekst } from '../components/kopier-knapp/kopier-knapp';

interface PersonInfoProps {
    fnr: string;
}

function PersonInfo(props: PersonInfoProps) {
    const personalia = useSelector((state: Appstate) => state.personalia.data);
    const navn = useSelector(PersonaliaSelector.selectSammensattNavn);
    const kanLeggeIArbeidsliste = useSelector(
        (state: Appstate) =>
            state.tildelVeileder.status !== 'LOADING' && ArbeidslisteSelector.selectKanLeggeIArbeidsListe(state)
    );
    const kanRedigereArbeidsliste = useSelector(ArbeidslisteSelector.selectKanRedigereArbeidsliste);

    const dispatch = useDispatch();
    const apneArbeidslisteModal = () => dispatch(navigerAction('vis_arbeidsliste'));

    return (
        <div className="personinfo">
            <Icon kjonn={personalia.kjonn} />
            <NavnOgAlder navn={navn} personalia={personalia} />
            <div>
                <ArbeidslisteKnapp
                    hidden={!(kanLeggeIArbeidsliste || kanRedigereArbeidsliste)}
                    onClick={apneArbeidslisteModal}
                    kanRedigereArbeidsliste={kanRedigereArbeidsliste}
                    ifylldIkon={kanRedigereArbeidsliste}
                    metricName="visittkort.arbeidsliste-ikon"
                />
                <KopierKnappTekst kopierTekst={props.fnr} />
            </div>
        </div>
    );
}

export default PersonInfo;
