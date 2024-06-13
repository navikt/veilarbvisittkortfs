import { useRef, useState } from 'react';
import { useDataStore } from '../../store/data-store';
import { mapfargekategoriToIkon } from './mapfargekategoriToIkon';
import { FargekategoriPopover } from './fargekategori-popover';
import { Fargekategorinavn } from '../../api/veilarbportefolje';
import { Button } from '@navikt/ds-react';

interface Props {
    disabled: boolean;
}

export const Fargekategoriknapp = ({ disabled }: Props) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { fargekategori, setFargekategori } = useDataStore();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const titletekst = fargekategori?.fargekategoriVerdi
        ? 'Kategori ' + Fargekategorinavn[fargekategori.fargekategoriVerdi]
        : 'Ingen kategori';

    return disabled ? (
        <div id="fargekategori--knapp" title={titletekst}>
            {mapfargekategoriToIkon(fargekategori?.fargekategoriVerdi ?? null)}
        </div>
    ) : (
        <>
            <Button
                variant="tertiary"
                icon={mapfargekategoriToIkon(fargekategori?.fargekategoriVerdi ?? null)}
                title={titletekst + ': endre'}
                ref={buttonRef}
                onClick={() => setIsPopoverOpen(true)}
                aria-expanded={isPopoverOpen}
            />
            <FargekategoriPopover
                buttonRef={buttonRef}
                isOpen={isPopoverOpen}
                setIsOpen={setIsPopoverOpen}
                setFargekategori={setFargekategori}
            />
        </>
    );
};
