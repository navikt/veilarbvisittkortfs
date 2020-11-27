import React from 'react';
import ArbeidslistekategoriVisning from './arbeidslistekategori-visning';
import withClickMetric from '../components/click-metric/click-metric';
import KnappFss from '../components/knapp-fss/knapp-fss';
import { KategoriModell } from '../../api/data/arbeidsliste';
import { useDataStore } from '../../store-midlertidig/data-store';

export interface ArbeidslisteKnappProps {
    hidden: boolean;
    onClick: () => void;
    kanRedigereArbeidsliste: boolean;
}

function ArbeidslisteKnapp(props: ArbeidslisteKnappProps) {
    const { arbeidsliste } = useDataStore();

    const kategori = arbeidsliste?.kategori || KategoriModell.TOM;

    return (
        <KnappFss className="arbeidsliste-knapp" onClick={props.onClick} hidden={props.hidden}>
            <ArbeidslistekategoriVisning kategori={kategori} />
        </KnappFss>
    );
}

export default withClickMetric(ArbeidslisteKnapp);
