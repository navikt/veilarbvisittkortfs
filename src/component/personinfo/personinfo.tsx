import NavnOgAlder from './components/navnogalder';
import KjonnIkon from './components/kjonn-ikon';
import ArbeidslisteKnapp from '../arbeidsliste/arbeidsliste-knapp';
import { KopierKnappTekst } from '../components/kopier-knapp/kopier-knapp';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import { selectSammensattNavn, selectTelefonnummer } from '../../util/selectors';
import { useModalStore } from '../../store/modal-store';
import './personinfo.less';
import { logMetrikk } from '../../util/logger';
import { formaterTelefonnummer } from '../../util/utils';
import { StringOrNothing } from '../../util/type/utility-types';
import { Alert, Label } from '@navikt/ds-react';
import HuskelappKnapp from '../huskelapp/huskelapp-knapp';
import { HUSKELAPP } from '../../api/veilarbpersonflatefs';
import { Fargekategoriknapp } from '../fargekategori/fargekategoriknapp';
import {
    feilErIkke403,
    harTilgangTilHuskelappEllerFargekategori,
    sjekkOpprettetEnhetLikInnloggetEnhet
} from '../huskelapp/harTilgangTilHuskelapp';
import { useArbeidsliste, useErUfordeltBruker, useFargekategori, useHuskelapp } from '../../api/veilarbportefolje';
import { useOppfolgingsstatus, useTilgangTilBrukersKontor } from '../../api/veilarboppfolging';

function PersonInfo() {
    const { brukerFnr, enhetId } = useAppStore();
    const { personalia, features } = useDataStore();
    const { showArbeidslisteModal, showHuskelappRedigereModal } = useModalStore();

    const {
        data: arbeidsliste,
        isLoading: arbeidslisteIsLoading,
        error: arbeidslisteError
    } = useArbeidsliste(brukerFnr);
    const { data: huskelapp, isLoading: huskelappIsLoading, error: huskelappError } = useHuskelapp(brukerFnr, enhetId);
    const {
        data: fargekategori,
        isLoading: fargekategoriIsLoading,
        error: fargekategoriError
    } = useFargekategori(brukerFnr);
    const {
        data: erUfordeltBruker,
        isLoading: erUfordeltBrukerIsLoading,
        error: erUfordeltBrukerError
    } = useErUfordeltBruker(brukerFnr, enhetId);
    const {
        data: tilgangTilBrukersKontor,
        isLoading: tilgangTilBrukersKontorIsLoading,
        error: tilgangTilBrukersKontorError
    } = useTilgangTilBrukersKontor(brukerFnr);
    const {
        data: oppfolgingsstatus,
        isLoading: oppfolgingsstatusIsLoading,
        error: oppfolgingsstatusError
    } = useOppfolgingsstatus(brukerFnr);

    const erArbeidslisteTom = arbeidsliste?.sistEndretAv == null;
    const erHuskelappTom = huskelapp?.huskelappId == null;
    const arbeidslisteikon = arbeidsliste?.kategori;

    const navn = selectSammensattNavn(personalia);

    const isLoadingDataForHuskelappOgFargekategori =
        erUfordeltBrukerIsLoading ||
        oppfolgingsstatusIsLoading ||
        tilgangTilBrukersKontorIsLoading ||
        fargekategoriIsLoading ||
        huskelappIsLoading ||
        arbeidslisteIsLoading;

    const dataForHuskelappOgFargekategoriHasErrors =
        erUfordeltBrukerError ||
        oppfolgingsstatusError ||
        tilgangTilBrukersKontorError ||
        feilErIkke403(fargekategoriError) ||
        feilErIkke403(huskelappError) ||
        feilErIkke403(arbeidslisteError);

    /* eslint-disable */
    if (dataForHuskelappOgFargekategoriHasErrors) {
        const errorMessages = [
            erUfordeltBrukerError && 'erUfordeltFeil: ' + erUfordeltBrukerError?.status,
            oppfolgingsstatusError && 'oppfolgingsstatusFeil: ' + oppfolgingsstatusError?.status,
            tilgangTilBrukersKontorError && 'tilgangTilBrukersKontorFeil: ' + tilgangTilBrukersKontorError?.status,
            feilErIkke403(fargekategoriError) && 'fargekategoriFeil: ' + fargekategoriError?.status,
            feilErIkke403(huskelappError) && 'huskelappFeil: ' + huskelappError?.status,
            feilErIkke403(arbeidslisteError) && 'arbeidslisteFeil: ' + arbeidslisteError?.status
        ]
            .filter(Boolean)
            .join(', ');
        console.error(`Feil ved henting av data for huskelapp og fargekategori for: ${errorMessages}`);
    }
    /* eslint-enable */

    const sjekkHarTilgangTilHuskelappEllerFargekategori =
        !isLoadingDataForHuskelappOgFargekategori &&
        harTilgangTilHuskelappEllerFargekategori(
            erUfordeltBruker!,
            !!oppfolgingsstatus?.veilederId,
            !!tilgangTilBrukersKontor?.tilgangTilBrukersKontor,
            sjekkOpprettetEnhetLikInnloggetEnhet(
                huskelapp?.enhetId,
                arbeidsliste?.navkontorForArbeidsliste,
                fargekategori?.enhetId,
                enhetId
            )
        );
    const klikkShowArbeidslisteModal = () => {
        logMetrikk('veilarbvisittkortfs.metrikker.visittkort.arbeidsliste-ikon', { kategori: arbeidslisteikon });
        showArbeidslisteModal();
    };

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
            <div className="arbeidsliste">
                {dataForHuskelappOgFargekategoriHasErrors && (
                    <Alert variant="error" inline>
                        Det oppstod feil ved huskelapp og kategori
                    </Alert>
                )}
                <>
                    <ArbeidslisteKnapp hidden={features[HUSKELAPP]} onClick={klikkShowArbeidslisteModal} />
                    <Fargekategoriknapp
                        skalVises={
                            !dataForHuskelappOgFargekategoriHasErrors &&
                            !isLoadingDataForHuskelappOgFargekategori &&
                            sjekkHarTilgangTilHuskelappEllerFargekategori
                        }
                        isLoading={isLoadingDataForHuskelappOgFargekategori}
                    />
                    <HuskelappKnapp
                        skalVises={
                            !dataForHuskelappOgFargekategoriHasErrors &&
                            !isLoadingDataForHuskelappOgFargekategori &&
                            sjekkHarTilgangTilHuskelappEllerFargekategori
                        }
                        isLoading={isLoadingDataForHuskelappOgFargekategori}
                        onClick={klikkShowHuskelapp}
                        harHuskelappEllerArbeidsliste={!erHuskelappTom || !erArbeidslisteTom}
                    />
                </>
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
