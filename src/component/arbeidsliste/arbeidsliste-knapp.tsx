import { Button } from '@navikt/ds-react';
import ArbeidslistekategoriVisning from './arbeidslistekategori-visning';
import withClickMetric from '../components/click-metric/click-metric';
import { KategoriModell, useArbeidsliste } from '../../api/veilarbportefolje';
import { trackAmplitude } from '../../amplitude/amplitude';
import { useAppStore } from '../../store/app-store';
import { logMetrikk } from '../../util/logger';

interface Props {
    hidden: boolean;
    onClick: () => void;
}

function ArbeidslisteKnapp({ hidden, onClick }: Props) {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const { data: arbeidsliste } = useArbeidsliste(brukerFnr, visVeilederVerktoy);

    const kategori = arbeidsliste?.kategori || KategoriModell.TOM;
    const arbeidslisteikon = arbeidsliste?.kategori;

    const handleClick = () => {
        trackAmplitude({
            name: 'navigere',
            data: { lenketekst: 'visittkort-fargekategori-ikon', destinasjon: 'arbeidslista' }
        });
        logMetrikk('veilarbvisittkortfs.metrikker.visittkort.arbeidsliste-ikon', { kategori: arbeidslisteikon });
        onClick();
    };

    if (hidden) {
        return null;
    }

    return (
        <Button
            icon={<ArbeidslistekategoriVisning kategori={kategori} />}
            className="arbeidsliste-knapp"
            onClick={handleClick}
            variant="tertiary"
        />
    );
}

export default withClickMetric(ArbeidslisteKnapp);
