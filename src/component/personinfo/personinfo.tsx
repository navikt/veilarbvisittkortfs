import { CopyButton, Label } from '@navikt/ds-react';
import NavnOgAlder from './components/navnogalder';
import { KjonnIkon } from './components/kjonn-ikon';
import { selectHarVergemaal, selectSammensattNavn, selectTelefonnummer } from '../../util/selectors';
import { logMetrikk } from '../../util/logger';
import { StringOrNothing } from '../../util/type/utility-types';
import HuskelappKnapp from '../huskelapp/huskelapp-knapp';
import { Fargekategoriknapp } from '../fargekategori/fargekategoriknapp';
import { harTilgangTilHuskelappEllerFargekategori } from '../huskelapp/harTilgangTilHuskelapp';
import { useErUfordeltBruker } from '../../api/veilarbportefolje';
import { useOppfolging } from '../../api/veilarboppfolging';
import { useModalStore } from '../../store/modal-store';
import { formaterTelefonnummer } from '../../util/formaterTelefonnummer';
import './personinfo.less';
import { useVisVeilederVerktøy } from '../../store/visittkort-config';
import { usePersonalia, useVerge } from '../../api/veilarbperson';

function PersonInfo({ brukerFnr }: { brukerFnr: string }) {
    const visVeilederVerktoy = useVisVeilederVerktøy();
    const { personalia } = usePersonalia(brukerFnr);
    const { verge } = useVerge(brukerFnr);
    const { oppfolging } = useOppfolging(brukerFnr);
    const { showHuskelappRedigereModal } = useModalStore();

    const { data: erUfordeltBruker } = useErUfordeltBruker(
        brukerFnr,
        visVeilederVerktoy && oppfolging?.underOppfolging
    );

    const tilgangTilBrukersKontor = oppfolging
        ? oppfolging.harVeilederLeseTilgangTilBruker && oppfolging.harVeilederLeseTilgangTilBrukersEnhet
        : false;

    const navn = selectSammensattNavn(personalia);

    const sjekkHarTilgangTilHuskelappEllerFargekategori = harTilgangTilHuskelappEllerFargekategori(
        erUfordeltBruker === undefined ? true : erUfordeltBruker,
        !!oppfolging?.veilederId,
        tilgangTilBrukersKontor
    );

    const klikkShowHuskelapp = () => {
        logMetrikk('veilarbvisittkortfs.metrikker.visittkort.huskelapp-ikon');
        showHuskelappRedigereModal();
    };
    const uformattertTelefon: StringOrNothing = selectTelefonnummer(personalia);
    const telefon: string = formaterTelefonnummer(uformattertTelefon);
    const harPrioritet1Telefon = personalia?.telefon.some(
        oppføring => oppføring.prioritet === '1' && oppføring.telefonNr === uformattertTelefon
    );
    const visSomVerge = selectHarVergemaal(verge) && (harPrioritet1Telefon ?? false);

    return (
        <div className="personinfo">
            {personalia?.kjonn && <KjonnIkon kjonn={personalia?.kjonn as string} />}
            <NavnOgAlder fodselsdato={personalia?.fodselsdato as string} navn={navn} />
            <div className="verktoylinje">
                {sjekkHarTilgangTilHuskelappEllerFargekategori && brukerFnr && (
                    <>
                        <Fargekategoriknapp />
                        <HuskelappKnapp
                            onClick={klikkShowHuskelapp}
                            brukerFnr={brukerFnr}
                            visVeilederVerktoy={visVeilederVerktoy}
                        />
                    </>
                )}
                <CopyButton
                    aria-label="Kopier fødselsnummer"
                    copyText={brukerFnr}
                    text={`F.nr.: ${brukerFnr}`}
                    activeText="Kopiert!"
                    size="medium"
                    iconPosition="right"
                />
                {<Label>/</Label>}
                {uformattertTelefon && (
                    <CopyButton
                        aria-label={visSomVerge ? 'Kopier telefonnummer til verge' : 'Kopier telefonnummer'}
                        copyText={telefon.replaceAll(' ', '')}
                        text={`Tlf.: ${telefon}${visSomVerge ? ' (verge)' : ''}`}
                        activeText="Kopiert!"
                        size="medium"
                        iconPosition="right"
                    />
                )}
                {!uformattertTelefon && <Label className="uten-telefon">Tlf.: -</Label>}
            </div>
        </div>
    );
}

export default PersonInfo;
