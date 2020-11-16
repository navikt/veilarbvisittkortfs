import * as React from 'react';
import NavnOgAlder from './components/navnogalder';
import './personinfo.less';
import Icon from './components/icon';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../types/appstate';
import ArbeidslisteKnapp from '../arbeidsliste/arbeidsliste-knapp';
import ArbeidslisteSelector from '../../store/arbeidsliste/selector';
import { navigerAction } from '../../store/navigation/actions';
import { KopierKnappTekst } from '../components/kopier-knapp/kopier-knapp';
import { useAppStore } from '../../store-midlertidig/app-store';
import { logger } from '../../util/logger';
import { useDataStore } from '../../store-midlertidig/data-store';
import { selectSammensattNavn } from '../../util/selectors';

function PersonInfo() {
    const { brukerFnr } = useAppStore();
    const { personalia } = useDataStore();

    const navn = selectSammensattNavn(personalia);

    const kanLeggeIArbeidsliste = useSelector(
        (state: Appstate) =>
            state.tildelVeileder.status !== 'LOADING' && ArbeidslisteSelector.selectKanLeggeIArbeidsListe(state)
    );

    const kanRedigereArbeidsliste = useSelector(ArbeidslisteSelector.selectKanRedigereArbeidsliste);

    const dispatch = useDispatch();

    const arbeidslisteikon = useSelector((state: Appstate) => state.arbeidsliste.data.kategori);

    const klikk = () => {
        logger.event('veilarbvisittkortfs.metrikker.visittkort.arbeidsliste-ikon', { kategori: arbeidslisteikon });
        dispatch(navigerAction('vis_arbeidsliste'));
    };

    return (
        <div className="personinfo">
            <Icon kjonn={personalia.kjonn} />
            <NavnOgAlder navn={navn} personalia={personalia} />
            <div>
                <ArbeidslisteKnapp
                    hidden={!(kanLeggeIArbeidsliste || kanRedigereArbeidsliste)}
                    onClick={klikk}
                    kanRedigereArbeidsliste={kanRedigereArbeidsliste}
                />
                <KopierKnappTekst kopierTekst={brukerFnr} />
            </div>
        </div>
    );
}

export default PersonInfo;
