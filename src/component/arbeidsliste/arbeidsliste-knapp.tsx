import React from 'react';
import ArbeidslistekategoriVisning from './arbeidslistekategori-visning';
import withClickMetric from '../components/click-metric/click-metric';
import { useSelector } from 'react-redux';
import { Appstate } from '../../types/appstate';
import KnappFss from '../components/knapp-fss/knapp-fss';
import { KategoriModell } from '../../api/data/arbeidsliste';

export interface ArbeidslisteKnappProps {
    hidden: boolean;
    onClick: () => void;
    kanRedigereArbeidsliste: boolean;
}

function ArbeidslisteKnapp(props: ArbeidslisteKnappProps) {
    const kategori = useSelector((state: Appstate) => state.arbeidsliste.data.kategori || KategoriModell.TOM);
    return (
        <KnappFss className="arbeidsliste-knapp" onClick={props.onClick} hidden={props.hidden}>
            <ArbeidslistekategoriVisning kategori={kategori} />
        </KnappFss>
    );
}

export default withClickMetric(ArbeidslisteKnapp);
