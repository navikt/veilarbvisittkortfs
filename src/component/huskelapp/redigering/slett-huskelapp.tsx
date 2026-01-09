import { Button } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';
import { useModalStore } from '../../../store/modal-store';
import { useHuskelapp } from '../../../api/veilarbportefolje';
import { useBrukerFnr } from '../../../store/app-store';
import { useVisVeilederVerktøy } from '../../../store/visittkort-config';

interface Props {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
}

export const SlettHuskelapp = ({ variant = 'secondary' }: Props) => {
    const brukerFnr = useBrukerFnr();
    const visVeilederVerktoy = useVisVeilederVerktøy();
    const { showFjernHuskelappModal } = useModalStore();
    const { data: huskelapp } = useHuskelapp(brukerFnr, visVeilederVerktoy);

    if (!huskelapp) {
        // Vi manglar data for å bestemme om slettknappen kan visast
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
