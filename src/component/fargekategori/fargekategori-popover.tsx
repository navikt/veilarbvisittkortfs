import { useState } from 'react';
import { AxiosError } from 'axios';
import { Alert, Button, Popover } from '@navikt/ds-react';
import { useBrukerFnr, useEnhetIdValgtIModiaContextHolder } from '../../store/app-store';
import { mapfargekategoriToIkon } from './mapfargekategoriToIkon';
import { endreFargekategori, Fargekategori, FargekategoriModell, Fargekategorinavn } from '../../api/veilarbportefolje';

interface Props {
    buttonAnchor: React.RefObject<HTMLButtonElement | null>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setFargekategori: (fargekategori: Fargekategori) => void;
}

export const FargekategoriPopover = ({ buttonAnchor, isOpen, setIsOpen, setFargekategori }: Props) => {
    const brukerFnr = useBrukerFnr();
    const enhetId = useEnhetIdValgtIModiaContextHolder();
    const [error, setError] = useState<string>();
    const onClick = (kategoriVerdi: FargekategoriModell) => {
        if (!brukerFnr) return;
        endreFargekategori(kategoriVerdi, brukerFnr)
            .then(res => res.data)
            .then(response =>
                setFargekategori({
                    fargekategoriVerdi: response.fargekategoriVerdi as FargekategoriModell,
                    enhetId: enhetId
                })
            )
            .then(() => setError(undefined))
            .then(() => setIsOpen(false))
            .catch(({ response }: AxiosError) => {
                if (response?.status === 400)
                    return setError('Kunne ikke oppdatere kategori. Fødselsnummer er ugyldig.');
                else if (response?.status === 403) return setError('Du har ikke tilgang til å oppdatere kategori.');
                else return setError('Noe gikk galt, prøv igjen senere.');
            });
    };

    const fargekategoriknapper = Object.entries(FargekategoriModell).map(([key, fargekategori]) => {
        return (
            <Button
                key={key}
                size="small"
                variant="tertiary"
                icon={mapfargekategoriToIkon(fargekategori)}
                title={Fargekategorinavn[fargekategori]}
                onClick={() => onClick(fargekategori)}
            />
        );
    });

    return (
        <Popover
            anchorEl={buttonAnchor.current}
            open={isOpen}
            onClose={() => {
                setError(undefined);
                setIsOpen(false);
            }}
            placement="bottom-start"
        >
            <Popover.Content id="fargekategori-popover__innhold">
                {error ? (
                    <Alert size="small" variant="error">
                        {error}
                    </Alert>
                ) : (
                    fargekategoriknapper
                )}
            </Popover.Content>
        </Popover>
    );
};
