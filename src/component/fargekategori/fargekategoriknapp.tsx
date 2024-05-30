import React, { useRef, useState } from 'react';
import { useDataStore } from '../../store/data-store';
import { Button, Tooltip } from '@navikt/ds-react';
import { mapfargekategoriToIkon } from './mapfargekategoriToIkon';
import { FargekategoriPopover } from './fargekategori-popover';
import { utvidetFargekategoriModell } from '../../api/veilarbportefolje';

interface Props {
    hidden: boolean;
}

export const Fargekategoriknapp = ({ hidden }: Props) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { fargekategori, setFargekategori } = useDataStore();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const tooltip = fargekategori?.fargekategoriVerdi
        ? utvidetFargekategoriModell.find(f => f.key === fargekategori?.fargekategoriVerdi)?.beskrivelse
        : 'Ingen kategori';

    if (hidden) {
        return null;
    }

    return (
        <>
            <Tooltip content={`${tooltip} endre fargekategori`}>
                <Button
                    ref={buttonRef}
                    icon={mapfargekategoriToIkon(fargekategori?.fargekategoriVerdi ?? null)}
                    className="fargekategori-knapp"
                    onClick={() => setIsPopoverOpen(true)}
                    variant="tertiary-neutral"
                    size="medium"
                    aria-expanded={isPopoverOpen}
                />
            </Tooltip>
            <FargekategoriPopover
                buttonRef={buttonRef}
                isOpen={isPopoverOpen}
                setIsOpen={setIsPopoverOpen}
                setFargekategori={setFargekategori}
            />
        </>
    );
};
