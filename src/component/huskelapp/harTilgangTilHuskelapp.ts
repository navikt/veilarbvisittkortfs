import { StringOrNothing } from '../../util/type/utility-types';
import { ErrorMessage } from '../../api/utils';

export const sjekkOpprettetEnhetLikInnloggetEnhet = (
    huskelappEnhet: StringOrNothing,
    arbeidslisteEnhet: StringOrNothing,
    fargkategoriEnhet: StringOrNothing,
    innloggetEnhet: StringOrNothing
): boolean => {
    if (huskelappEnhet != null) {
        return huskelappEnhet === innloggetEnhet;
    }
    if (arbeidslisteEnhet != null) {
        return arbeidslisteEnhet === innloggetEnhet;
    }
    if (fargkategoriEnhet != null) {
        return fargkategoriEnhet === innloggetEnhet;
    }
    return true;
};

export const harTilgangTilHuskelappEllerFargekategori = (
    erBrukerUfordelt: boolean,
    harVeileder: boolean,
    innloggetVeilederHarTilgangTilBrukersKontor: boolean,
    tilgangTilOpprettetEnhet: boolean
): boolean => {
    if (erBrukerUfordelt) {
        return false;
    }

    return harVeileder && innloggetVeilederHarTilgangTilBrukersKontor && tilgangTilOpprettetEnhet;
};

export const feilErIkke403 = (error?: ErrorMessage) => error && error.status !== 403;
