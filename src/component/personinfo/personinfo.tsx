import React from 'react';
import NavnOgAlder from './components/navnogalder';
import Icon from './components/icon';
import ArbeidslisteKnapp from '../arbeidsliste/arbeidsliste-knapp';
import { KopierKnappTekst } from '../components/kopier-knapp/kopier-knapp';
import { useAppStore } from '../../store/app-store';
import { logger } from '../../util/logger';
import { useDataStore } from '../../store/data-store';
import { selectKanLeggeIArbeidsListe, selectKanRedigereArbeidsliste, selectSammensattNavn } from '../../util/selectors';
import { useModalStore } from '../../store/modal-store';
import './personinfo.less';

function PersonInfo() {
    const { brukerFnr } = useAppStore();
    const { personalia, arbeidsliste, oppfolgingsstatus, innloggetVeileder } = useDataStore();
    const { showArbeidslisteModal } = useModalStore();

    const navn = selectSammensattNavn(personalia);

    // TODO: Det var tidligere også en sjekk på state.tildelVeileder.status !== 'LOADING'
    const kanLeggeIArbeidsliste = selectKanLeggeIArbeidsListe(innloggetVeileder, oppfolgingsstatus, arbeidsliste);

    const kanRedigereArbeidsliste = selectKanRedigereArbeidsliste(arbeidsliste);
    const arbeidslisteikon = arbeidsliste?.kategori;

    const klikk = () => {
        logger.event('veilarbvisittkortfs.metrikker.visittkort.arbeidsliste-ikon', { kategori: arbeidslisteikon });
        showArbeidslisteModal();
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
