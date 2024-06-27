import { ErrorMessage } from '../../api/utils';

export const harTilgangTilHuskelappEllerFargekategori = (
    erBrukerUfordelt: boolean,
    harVeileder: boolean,
    innloggetVeilederHarTilgangTilBrukersKontor: boolean
): boolean => {
    if (erBrukerUfordelt) {
        return false;
    }
    return harVeileder && innloggetVeilederHarTilgangTilBrukersKontor;
};

export const feilErIkke403 = (error?: ErrorMessage) => error && error.status !== 403;
export const feilErIkke404 = (error?: ErrorMessage) => error && error.status !== 404;
export const feilErIkke400 = (error?: ErrorMessage) => error && error.status !== 400;
