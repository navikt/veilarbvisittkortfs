import React from 'react';
import ArbeidslistekategoriVisning from './arbeidslistekategori-visning';
import withClickMetric from '../components/click-metric/click-metric';
import KnappFss from '../components/knapp-fss/knapp-fss';
import { useDataStore } from '../../store/data-store';
import { KategoriModell } from '../../api/veilarbportefolje';

export interface ArbeidslisteKnappProps {
    hidden: boolean;
    onClick: () => void;
    kanRedigereArbeidsliste: boolean;
}

function ArbeidslisteKnapp(props: ArbeidslisteKnappProps) {
    const { arbeidsliste } = useDataStore();

    const kategori = arbeidsliste?.kategori || KategoriModell.TOM;

    return (
        <KnappFss variant="tertiary" className="arbeidsliste-knapp" onClick={props.onClick} hidden={props.hidden}>
            <ArbeidslistekategoriVisning kategori={kategori} />
        </KnappFss>
    );
}

export default withClickMetric(ArbeidslisteKnapp);
