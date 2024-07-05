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
    feilErIkke400,
    feilErIkke403,
    feilErIkke404,
    harTilgangTilHuskelappEllerFargekategori
} from '../huskelapp/harTilgangTilHuskelapp';
import { useArbeidsliste, useErUfordeltBruker, useHuskelapp } from '../../api/veilarbportefolje';
import { useOppfolgingsstatus, useTilgangTilBrukersKontor } from '../../api/veilarboppfolging';

function PersonInfo() {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const { personalia, features, oppfolging } = useDataStore();
    const { showArbeidslisteModal, showHuskelappRedigereModal } = useModalStore();
    const {
        data: oppfolgingsstatus,
        isLoading: oppfolgingsstatusIsLoading,
        error: oppfolgingsstatusError
    } = useOppfolgingsstatus(brukerFnr);
    const {
        data: arbeidsliste,
        isLoading: arbeidslisteIsLoading,
        error: arbeidslisteError
    } = useArbeidsliste(brukerFnr, visVeilederVerktoy);
    const {
        data: huskelapp,
        isLoading: huskelappIsLoading,
        error: huskelappError
    } = useHuskelapp(brukerFnr, visVeilederVerktoy);
    const {
        data: erUfordeltBruker,
        isLoading: erUfordeltBrukerIsLoading,
        error: erUfordeltBrukerError
    } = useErUfordeltBruker(brukerFnr, visVeilederVerktoy && oppfolging?.underOppfolging);
    const {
        data: tilgangTilBrukersKontor,
        isLoading: tilgangTilBrukersKontorIsLoading,
        error: tilgangTilBrukersKontorError
    } = useTilgangTilBrukersKontor(brukerFnr);

    const erArbeidslisteTom = arbeidsliste?.sistEndretAv == null;
    const erHuskelappTom = huskelapp?.huskelappId == null;
    const arbeidslisteikon = arbeidsliste?.kategori;

    const navn = selectSammensattNavn(personalia);

    const isLoadingDataForHuskelappOgFargekategori =
        erUfordeltBrukerIsLoading ||
        oppfolgingsstatusIsLoading ||
        tilgangTilBrukersKontorIsLoading ||
        huskelappIsLoading ||
        arbeidslisteIsLoading;

    const dataForHuskelappOgFargekategoriHasErrors =
        feilErIkke400(erUfordeltBrukerError) ||
        feilErIkke404(oppfolgingsstatusError) ||
        tilgangTilBrukersKontorError ||
        (feilErIkke403(huskelappError) && feilErIkke400(huskelappError)) ||
        feilErIkke403(arbeidslisteError);

    if (dataForHuskelappOgFargekategoriHasErrors) {
        const errorMessages = [
            feilErIkke400(erUfordeltBrukerError) && 'erUfordeltFeil: ' + erUfordeltBrukerError?.status,
            feilErIkke404(oppfolgingsstatusError) && 'oppfolgingsstatusFeil: ' + oppfolgingsstatusError?.status,
            tilgangTilBrukersKontorError && 'tilgangTilBrukersKontorFeil: ' + tilgangTilBrukersKontorError?.status,
            feilErIkke403(huskelappError) && 'huskelappFeil: ' + huskelappError?.status,
            feilErIkke403(arbeidslisteError) && 'arbeidslisteFeil: ' + arbeidslisteError?.status
        ]
            .filter(Boolean)
            .join(', ');
        // eslint-disable-next-line no-console
        console.error(`Feil ved henting av data for huskelapp og fargekategori for: ${errorMessages}`);
    }

    const sjekkHarTilgangTilHuskelappEllerFargekategori =
        !dataForHuskelappOgFargekategoriHasErrors &&
        !isLoadingDataForHuskelappOgFargekategori &&
        harTilgangTilHuskelappEllerFargekategori(
            erUfordeltBruker === undefined ? true : erUfordeltBruker,
            !!oppfolgingsstatus?.veilederId,
            !!tilgangTilBrukersKontor?.tilgangTilBrukersKontor
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
                    <Alert variant="warning" size="small">
                        Feil i huskelapp/kategori
                    </Alert>
                )}
                <ArbeidslisteKnapp hidden={features[HUSKELAPP]} onClick={klikkShowArbeidslisteModal} />
                {(isLoadingDataForHuskelappOgFargekategori || sjekkHarTilgangTilHuskelappEllerFargekategori) && (
                    <>
                        <Fargekategoriknapp isLoading={isLoadingDataForHuskelappOgFargekategori} />
                        <HuskelappKnapp
                            isLoading={isLoadingDataForHuskelappOgFargekategori}
                            onClick={klikkShowHuskelapp}
                            harHuskelappEllerArbeidsliste={!erHuskelappTom || !erArbeidslisteTom}
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
