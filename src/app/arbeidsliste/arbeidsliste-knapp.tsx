import React from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import ArbeidslisteIkonVisning from './arbeidslisteikon-visning';
import withClickMetric from '../components/click-metric/click-metric';
import { useSelector } from 'react-redux';
import { Appstate } from '../../types/appstate';
import { KategoriModell } from '../../types/arbeidsliste';

export interface ArbeidslisteKnappProps {
    hidden: boolean;
    onClick: () => void;
    kanRedigereArbeidsliste: boolean;
}

function ArbeidslisteKnapp(props: ArbeidslisteKnappProps) {
    const kategori = useSelector((state: Appstate) => state.arbeidsliste.data.kategori || KategoriModell.TOM);
    return (
        <Flatknapp className="arbeidsliste-knapp" onClick={props.onClick} hidden={props.hidden}>
            <ArbeidslisteIkonVisning kategori={kategori} />
        </Flatknapp>
    );
}

export default withClickMetric(ArbeidslisteKnapp);
