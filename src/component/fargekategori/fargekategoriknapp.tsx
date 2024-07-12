import React, { useRef, useState } from 'react';
import { mapfargekategoriToIkon } from './mapfargekategoriToIkon';
import { FargekategoriPopover } from './fargekategori-popover';
import { Fargekategorinavn, useFargekategori } from '../../api/veilarbportefolje';
import { Alert, Button } from '@navikt/ds-react';
import { useAppStore } from '../../store/app-store';
import { feilErIkke400, feilErIkke403 } from '../huskelapp/harTilgangTilHuskelapp';

export const Fargekategoriknapp = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const {
        data: fargekategori,
        mutate: setFargekategori,
        isLoading: fargekategoriIsLoading,
        error: fargekategoriError
    } = useFargekategori(brukerFnr, visVeilederVerktoy);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const titletekst = fargekategori?.fargekategoriVerdi
        ? 'Kategori ' + Fargekategorinavn[fargekategori.fargekategoriVerdi].toLowerCase()
        : 'Ingen kategori';

    const hasError = feilErIkke403(fargekategoriError) && feilErIkke400(fargekategoriError);

    return (
        <>
            {hasError && (
                <Alert variant="warning" size="small">
                    Feil i fargekategori
                </Alert>
            )}
            {!hasError && (
                <>
                    <Button
                        variant="tertiary"
                        icon={mapfargekategoriToIkon(fargekategori?.fargekategoriVerdi ?? null)}
                        title={titletekst + ': endre'}
                        ref={buttonRef}
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        aria-expanded={isPopoverOpen}
                        loading={fargekategoriIsLoading}
                    />
                    <FargekategoriPopover
                        buttonRef={buttonRef}
                        isOpen={isPopoverOpen}
                        setIsOpen={setIsPopoverOpen}
                        setFargekategori={setFargekategori}
                    />
                </>
            )}
        </>
    );
};
