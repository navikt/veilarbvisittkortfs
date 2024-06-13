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

    return (
        <>
            <Button
                variant="tertiary"
                icon={mapfargekategoriToIkon(fargekategori?.fargekategoriVerdi ?? null)}
                title={
                    (fargekategori?.fargekategoriVerdi
                        ? Fargekategorinavn[fargekategori.fargekategoriVerdi]
                        : 'Ingen kategori') + ': endre'
                }
                ref={buttonRef}
                onClick={() => setIsPopoverOpen(true)}
                className="fargekategori-knapp"
                aria-expanded={isPopoverOpen}
                disabled={disabled}
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
