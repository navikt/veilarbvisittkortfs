import NavnOgAlder from './components/navnogalder';
import KjonnIkon from './components/kjonn-ikon';
import { KopierKnappTekst } from '../components/kopier-knapp/kopier-knapp';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import { selectSammensattNavn, selectTelefonnummer } from '../../util/selectors';
import './personinfo.less';
import { logMetrikk } from '../../util/logger';
import { formaterTelefonnummer } from '../../util/utils';
import { StringOrNothing } from '../../util/type/utility-types';
import { Label } from '@navikt/ds-react';
import HuskelappKnapp from '../huskelapp/huskelapp-knapp';
import { Fargekategoriknapp } from '../fargekategori/fargekategoriknapp';
import { harTilgangTilHuskelappEllerFargekategori } from '../huskelapp/harTilgangTilHuskelapp';
import { useErUfordeltBruker } from '../../api/veilarbportefolje';
import { useOppfolgingsstatus, useTilgangTilBrukersKontor } from '../../api/veilarboppfolging';
import { useModalStore } from '../../store/modal-store';
import { HUSKELAPP } from '../../api/veilarbpersonflatefs';

function PersonInfo() {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const { personalia, features, oppfolging } = useDataStore();
    const { showHuskelappRedigereModal } = useModalStore();
    const { data: oppfolgingsstatus } = useOppfolgingsstatus(brukerFnr);

    const { data: erUfordeltBruker } = useErUfordeltBruker(
        brukerFnr,
        visVeilederVerktoy && oppfolging?.underOppfolging
    );
    const { data: tilgangTilBrukersKontor } = useTilgangTilBrukersKontor(brukerFnr);

    const navn = selectSammensattNavn(personalia);

    const sjekkHarTilgangTilHuskelappEllerFargekategori =
        harTilgangTilHuskelappEllerFargekategori(
            erUfordeltBruker === undefined ? true : erUfordeltBruker,
            !!oppfolgingsstatus?.veilederId,
            !!tilgangTilBrukersKontor?.tilgangTilBrukersKontor
        ) && features[HUSKELAPP];

    const klikkShowHuskelapp = () => {
        logMetrikk('veilarbvisittkortfs.metrikker.visittkort.huskelapp-ikon');
        showHuskelappRedigereModal();
    };
    const uformattertTelefon: StringOrNothing = selectTelefonnummer(personalia);
    const telefon: string = formaterTelefonnummer(uformattertTelefon);

    return (
        <div className="personinfo">
            <KjonnIkon visible={personalia?.kjonn} kjonn={personalia?.kjonn as string} />
            <NavnOgAlder fodselsdato={personalia?.fodselsdato as string} navn={navn} />
            <div className="verktoylinje">
                {sjekkHarTilgangTilHuskelappEllerFargekategori && (
                    <>
                        <Fargekategoriknapp />
                        <HuskelappKnapp
                            onClick={klikkShowHuskelapp}
                            brukerFnr={brukerFnr}
                            visVeilederVerktoy={visVeilederVerktoy}
                        />
                    </>
                )}
                <KopierKnappTekst kopierTekst={brukerFnr} viseTekst={`F.nr.: ${brukerFnr}`} />
                {<Label>/</Label>}
                {uformattertTelefon && (
                    <KopierKnappTekst kopierTekst={telefon.replace(/\s/g, '')} viseTekst={`Tlf.: ${telefon}`} />
                )}
                {!uformattertTelefon && <Label className="uten-telefon">Tlf.: -</Label>}
            </div>
        </div>
    );
}

export default PersonInfo;
