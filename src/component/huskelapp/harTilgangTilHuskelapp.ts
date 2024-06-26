import { StringOrNothing } from '../../util/type/utility-types';
import { ErrorMessage } from '../../api/utils';
import { Arbeidsliste, Fargekategori, Huskelapp } from '../../api/veilarbportefolje';

export const sjekkOpprettetEnhetLikInnloggetEnhet = (
    huskelapp: Huskelapp | null,
    arbeidsliste: Arbeidsliste | null,
    fargekategori: Fargekategori | null,
    innloggetEnhet: StringOrNothing
): boolean => {
    if (huskelapp?.enhetId != null) {
        return huskelapp.enhetId === innloggetEnhet;
    }
    if (arbeidsliste?.navkontorForArbeidsliste != null) {
        return arbeidsliste.navkontorForArbeidsliste === innloggetEnhet;
    }
    if (fargekategori?.enhetId != null) {
        return fargekategori.enhetId === innloggetEnhet;
    }
    return huskelapp != null && fargekategori != null && arbeidsliste != null;
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
