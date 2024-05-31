import React, { useRef, useState } from 'react';
import { useDataStore } from '../../store/data-store';
import { Button } from '@navikt/ds-react';
import { mapfargekategoriToIkon } from './mapfargekategoriToIkon';
import { FargekategoriPopover } from './fargekategori-popover';

interface Props {
    hidden: boolean;
}

export const Fargekategoriknapp = ({ hidden }: Props) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { fargekategori, setFargekategori } = useDataStore();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    if (hidden) {
        return null;
    }

    return (
        <>
            <Button
                ref={buttonRef}
                icon={mapfargekategoriToIkon(fargekategori?.fargekategoriVerdi ?? null)}
                className="fargekategori-knapp"
                onClick={() => setIsPopoverOpen(true)}
                variant="tertiary-neutral"
                size="medium"
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
