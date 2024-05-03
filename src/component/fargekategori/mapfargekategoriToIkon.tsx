import { FargekategoriModell } from '../../api/veilarbportefolje';
import FargekategoriIkonBlattBokmerke from './ikoner/Fargekategoriikon_blatt_bokmerke.svg?react';
import FargekategoriIkonGronnTrekant from './ikoner/Fargekategoriikon_gronn_trekant.svg?react';
import FargekategoriIkonGulSirkel from './ikoner/Fargekategoriikon_gul_sirkel.svg?react';
import FargekategoriIkonLillaFirkant from './ikoner/Fargekategoriikon_lilla_firkant.svg?react';
import FargekategoriIkonLyseblaFemkant from './ikoner/Fargekategoriikon_lysebla_femkant.svg?react';
import FargekategoriIkonOransjeDiamant from './ikoner/Fargekategoriikon_oransje_diamant_v2.svg?react';
import FargekategoriIkonTomtBokmerke from './ikoner/Fargekategoriikon_ingen_kategori.svg?react';

export const mapfargekategoriToIkon = (fargekategori: FargekategoriModell | null) => {
    switch (fargekategori) {
        case FargekategoriModell.FARGEKATEGORI_A:
            return <FargekategoriIkonBlattBokmerke />;
        case FargekategoriModell.FARGEKATEGORI_B:
            return <FargekategoriIkonGronnTrekant />;
        case FargekategoriModell.FARGEKATEGORI_C:
            return <FargekategoriIkonGulSirkel />;
        case FargekategoriModell.FARGEKATEGORI_D:
            return <FargekategoriIkonLillaFirkant />;
        case FargekategoriModell.FARGEKATEGORI_E:
            return <FargekategoriIkonLyseblaFemkant />;
        case FargekategoriModell.FARGEKATEGORI_F:
            return <FargekategoriIkonOransjeDiamant />;
        case FargekategoriModell.INGEN_KATEGORI:
        case null:
            return <FargekategoriIkonTomtBokmerke />;
    }
};
