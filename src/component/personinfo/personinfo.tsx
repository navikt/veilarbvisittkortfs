import { CopyButton, Label } from '@navikt/ds-react';
import NavnOgAlder from './components/navnogalder';
import { KjonnIkon } from './components/kjonn-ikon';
import { selectSammensattNavn, selectTelefonnummer } from '../../util/selectors';
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
import { usePersonalia } from '../../api/veilarbperson';

function PersonInfo({ brukerFnr }: { brukerFnr: string }) {
    const visVeilederVerktoy = useVisVeilederVerktøy();
    const { personalia } = usePersonalia(brukerFnr);
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

    return (
        <div className="grid min-w-max flex-none grid-cols-[2rem_16.5rem_max-content] items-center">
            <div className="h-[2rem] w-[2rem]">{personalia?.kjonn && <KjonnIkon kjonn={personalia.kjonn} />}</div>
            <NavnOgAlder fodselsdato={personalia?.fodselsdato as string} navn={navn} />
            <div className="verktoylinje min-w-max">
                <div className="flex w-[calc(6rem+var(--ax-space-4))] shrink-0 items-center gap-[var(--ax-space-4)]">
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
                </div>
                <div className="flex w-max flex-col items-start">
                    <CopyButton
                        aria-label="Kopier fødselsnummer"
                        className="shrink-0 whitespace-nowrap"
                        copyText={brukerFnr}
                        text={`F.nr.: ${brukerFnr}`}
                        activeText="Kopiert!"
                        size="small"
                        iconPosition="right"
                    />
                    {uformattertTelefon && (
                        <CopyButton
                            aria-label="Kopier telefonnummer"
                            className="shrink-0 whitespace-nowrap"
                            copyText={telefon.replaceAll(' ', '')}
                            text={`Tlf.: ${telefon}`}
                            activeText="Kopiert!"
                            size="small"
                            iconPosition="right"
                        />
                    )}
                    {!uformattertTelefon && <Label className="uten-telefon shrink-0 whitespace-nowrap">Tlf.: -</Label>}
                </div>
            </div>
        </div>
    );
}

export default PersonInfo;
