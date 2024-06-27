import { FargekategoriModell } from '../../api/veilarbportefolje';
import FargekategoriIkonBlaHalvsirkel from './ikoner/Fargekategoriikon_bla_halvsirkel.svg?react';
import FargekategoriIkonGronnTrekant from './ikoner/Fargekategoriikon_gronn_trekant.svg?react';
import FargekategoriIkonGulSirkel from './ikoner/Fargekategoriikon_gul_sirkel.svg?react';
import FargekategoriIkonLillaFirkant from './ikoner/Fargekategoriikon_lilla_firkant.svg?react';
import FargekategoriIkonOransjeRombe from './ikoner/Fargekategoriikon_oransje_rombe.svg?react';
import FargekategoriIkonTurkisFemkant from './ikoner/Fargekategoriikon_turkis_femkant.svg?react';
import FargekategoriIkonTomtBokmerke from './ikoner/Fargekategoriikon_bokmerke_stiplet.svg?react';

export const mapfargekategoriToIkon = (fargekategori: FargekategoriModell | null) => {
    switch (fargekategori) {
        case FargekategoriModell.FARGEKATEGORI_A:
            return <FargekategoriIkonBlaHalvsirkel />;
        case FargekategoriModell.FARGEKATEGORI_B:
            return <FargekategoriIkonGronnTrekant />;
        case FargekategoriModell.FARGEKATEGORI_C:
            return <FargekategoriIkonGulSirkel />;
        case FargekategoriModell.FARGEKATEGORI_D:
            return <FargekategoriIkonLillaFirkant />;
        case FargekategoriModell.FARGEKATEGORI_F:
            return <FargekategoriIkonOransjeRombe />;
        case FargekategoriModell.FARGEKATEGORI_E:
            return <FargekategoriIkonTurkisFemkant />;
        case FargekategoriModell.INGEN_KATEGORI:
        case null:
            return <FargekategoriIkonTomtBokmerke />;
    }
};
