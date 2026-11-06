import { HttpError } from '../../api/httpUtils';

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

export const feilErIkke403 = (error?: HttpError) => error && error.response?.status !== 403;
export const feilErIkke404 = (error?: HttpError) => error && error.response?.status !== 404;
export const feilErIkke400 = (error?: HttpError) => error && error.response?.status !== 400;
