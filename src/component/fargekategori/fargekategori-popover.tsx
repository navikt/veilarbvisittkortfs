import { useState } from 'react';
import { AxiosError } from 'axios';
import { Alert, Button, Popover } from '@navikt/ds-react';
import { useAppStore } from '../../store/app-store';
import { mapfargekategoriToIkon } from './mapfargekategoriToIkon';
import { trackAmplitude } from '../../amplitude/amplitude';
import { endreFargekategori, Fargekategori, FargekategoriModell, Fargekategorinavn } from '../../api/veilarbportefolje';

interface Props {
    buttonRef: React.RefObject<HTMLButtonElement>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setFargekategori: (fargekategori: Fargekategori) => void;
}
export const FargekategoriPopover = ({ buttonRef, isOpen, setIsOpen, setFargekategori }: Props) => {
    const { brukerFnr, enhetId } = useAppStore();
    const [error, setError] = useState<string>();
    const onClick = (kategoriVerdi: FargekategoriModell) => {
        trackAmplitude({
            name: 'knapp klikket',
            data: {
                knapptekst: kategoriVerdi,
                effekt: `Valgt fargekategori ${kategoriVerdi} på bruker`
            }
        });
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
            anchorEl={buttonRef.current}
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
