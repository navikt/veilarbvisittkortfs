import React, { useRef, useState } from 'react';
import { mapfargekategoriToIkon } from './mapfargekategoriToIkon';
import { FargekategoriPopover } from './fargekategori-popover';
import { Fargekategorinavn, useFargekategori } from '../../api/veilarbportefolje';
import { Button } from '@navikt/ds-react';
import { useAppStore } from '../../store/app-store';

interface Props {
    isLoading: boolean;
}

export const Fargekategoriknapp = ({ isLoading }: Props) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { brukerFnr } = useAppStore();
    const { data: fargekategori, mutate: setFargekategori } = useFargekategori(brukerFnr);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const titletekst = fargekategori?.fargekategoriVerdi
        ? 'Kategori ' + Fargekategorinavn[fargekategori.fargekategoriVerdi].toLowerCase()
        : 'Ingen kategori';

    return (
        <>
            <Button
                variant="tertiary"
                icon={mapfargekategoriToIkon(fargekategori?.fargekategoriVerdi ?? null)}
                title={titletekst + ': endre'}
                ref={buttonRef}
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                aria-expanded={isPopoverOpen}
                loading={isLoading}
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
