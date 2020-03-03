import * as React from 'react';
import { ReactComponent as ArbeidslisteikonBla } from '../veilederverktoy/arbeidsliste/arbeidslisteikon/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonLilla } from '../veilederverktoy/arbeidsliste/arbeidslisteikon/arbeidslisteikon_lilla.svg';
import { ReactComponent as ArbeidslisteikonGronn } from '../veilederverktoy/arbeidsliste/arbeidslisteikon/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from '../veilederverktoy/arbeidsliste/arbeidslisteikon/arbeidslisteikon_gul.svg';
import { KategoriModell } from '../../types/arbeidsliste';
import { ReactComponent as ArbeidslisteIkon } from './arbeidsliste.svg';

interface ArbeidslisteikonProps {
    kategori: KategoriModell;
}

export default function ArbeidslisteIkonVisning({ kategori }: ArbeidslisteikonProps) {
    switch (kategori) {
        case KategoriModell.BLA:
            return <ArbeidslisteikonBla className="arbeidsliste-knapp__icon" />;
        case KategoriModell.LILLA:
            return <ArbeidslisteikonLilla className="arbeidsliste-knapp__icon" />;
        case KategoriModell.GRONN:
            return <ArbeidslisteikonGronn className="arbeidsliste-knapp__icon" />;
        case KategoriModell.GUL:
            return <ArbeidslisteikonGul className="arbeidsliste-knapp__icon" />;
        case KategoriModell.TOM:
            return <ArbeidslisteIkon className="arbeidsliste-knapp__icon" />;
        default:
            return null;
    }
}
