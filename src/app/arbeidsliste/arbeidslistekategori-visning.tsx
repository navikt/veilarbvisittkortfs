import * as React from 'react';
import { ReactComponent as ArbeidslisteikonBla } from '../veilederverktoy/arbeidsliste/arbeidslistekategori/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonLilla } from '../veilederverktoy/arbeidsliste/arbeidslistekategori/arbeidslisteikon_lilla.svg';
import { ReactComponent as ArbeidslisteikonGronn } from '../veilederverktoy/arbeidsliste/arbeidslistekategori/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from '../veilederverktoy/arbeidsliste/arbeidslistekategori/arbeidslisteikon_gul.svg';
import { KategoriModell } from '../../types/arbeidsliste';
import { ReactComponent as ArbeidslisteIkon } from './arbeidsliste.svg';

interface ArbeidslistekategoriProps {
    kategori: KategoriModell;
}

export default function ArbeidslistekategoriVisning({ kategori }: ArbeidslistekategoriProps) {
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
