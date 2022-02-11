import React from 'react';
import { ReactComponent as ArbeidslisteikonBla } from './arbeidslisteikon/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonLilla } from './arbeidslisteikon/arbeidslisteikon_lilla.svg';
import { ReactComponent as ArbeidslisteikonGronn } from './arbeidslisteikon/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from './arbeidslisteikon/arbeidslisteikon_gul.svg';
import { ReactComponent as ArbeidslisteIkon } from './arbeidslisteikon/arbeidslisteikon_linje.svg';
import { KategoriModell } from '../../api/veilarbportefolje';

interface ArbeidslistekategoriProps {
    kategori: KategoriModell;
}

export default function ArbeidslistekategoriVisning({ kategori }: ArbeidslistekategoriProps) {
    switch (kategori) {
        case KategoriModell.BLA:
            return <ArbeidslisteikonBla className="arbeidsliste-knapp__icon" />;
        case KategoriModell.GRONN:
            return <ArbeidslisteikonGronn className="arbeidsliste-knapp__icon" />;
        case KategoriModell.LILLA:
            return <ArbeidslisteikonLilla className="arbeidsliste-knapp__icon" />;
        case KategoriModell.GUL:
            return <ArbeidslisteikonGul className="arbeidsliste-knapp__icon" />;
        case KategoriModell.TOM:
            return <ArbeidslisteIkon className="arbeidsliste-knapp__icon" />;
        default:
            return null;
    }
}
