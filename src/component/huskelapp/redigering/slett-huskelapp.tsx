import { Button } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';
import { useModalStore } from '../../../store/modal-store';
import { kanFjerneHuskelapp } from '../../../util/selectors';
import { useDataStore } from '../../../store/data-store';

interface Props {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
}

export const SlettHuskelapp = ({ variant = 'secondary' }: Props) => {
    const { showFjernHuskelappModal } = useModalStore();
    const { huskelapp, innloggetVeileder, oppfolging } = useDataStore();

    if (!huskelapp || !innloggetVeileder) {
        // Vi manglar data for å bestemme om slettknappen kan visast
        return null;
    }

    const veilederKanSletteHuskelapp = kanFjerneHuskelapp(huskelapp, oppfolging, innloggetVeileder.ident);

    if (!veilederKanSletteHuskelapp) {
        return null;
    }

    return (
        <Button
            onClick={showFjernHuskelappModal}
            icon={<TrashIcon aria-hidden />}
            size="small"
            variant={variant}
            type="button"
        >
            Slett
        </Button>
    );
};
