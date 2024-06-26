import NavnOgAlder from './components/navnogalder';
import KjonnIkon from './components/kjonn-ikon';
import ArbeidslisteKnapp from '../arbeidsliste/arbeidsliste-knapp';
import { KopierKnappTekst } from '../components/kopier-knapp/kopier-knapp';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import {
    selectKanEndreFargekategori,
    selectKanLeggeIArbeidsListe,
    selectKanOppretteHuskelapp,
    selectKanRedigereArbeidsliste,
    selectKanRedigereHuskelapp,
    selectSammensattNavn,
    selectTelefonnummer
} from '../../util/selectors';
import { useModalStore } from '../../store/modal-store';
import './personinfo.less';
import { logMetrikk } from '../../util/logger';
import { formaterTelefonnummer } from '../../util/utils';
import { StringOrNothing } from '../../util/type/utility-types';
import { Label } from '@navikt/ds-react';
import HuskelappKnapp from '../huskelapp/huskelapp-knapp';
import { HUSKELAPP } from '../../api/veilarbpersonflatefs';
import { Fargekategoriknapp } from '../fargekategori/fargekategoriknapp';

function PersonInfo() {
    const { brukerFnr } = useAppStore();
    const {
        personalia,
        arbeidsliste,
        oppfolgingsstatus,
        innloggetVeileder,
        huskelapp,
        features,
        tilgangTilBrukersKontor
    } = useDataStore();
    const { showArbeidslisteModal, showHuskelappRedigereModal } = useModalStore();

    const arbeidslisteikon = arbeidsliste?.kategori;

    const navn = selectSammensattNavn(personalia);
    const kanLeggeIArbeidsliste = selectKanLeggeIArbeidsListe(innloggetVeileder, oppfolgingsstatus, arbeidsliste);
    const kanRedigereArbeidsliste = selectKanRedigereArbeidsliste(arbeidsliste);
    const kanOppretteHuskelapp = selectKanOppretteHuskelapp(innloggetVeileder, oppfolgingsstatus);
    const kanRedigereHuskelapp = selectKanRedigereHuskelapp(
        innloggetVeileder,
        oppfolgingsstatus,
        tilgangTilBrukersKontor
    );
    const kanEndreFargekategori = selectKanEndreFargekategori(innloggetVeileder, oppfolgingsstatus);

    const klikkShowArbeidslisteModal = () => {
        logMetrikk('veilarbvisittkortfs.metrikker.visittkort.arbeidsliste-ikon', { kategori: arbeidslisteikon });
        showArbeidslisteModal();
    };

    const erArbeidslisteTom = arbeidsliste?.sistEndretAv == null;
    const erHuskelappTom = huskelapp?.huskelappId == null;

    const visHuskelappknapp =
        features[HUSKELAPP] &&
        ((erHuskelappTom && kanOppretteHuskelapp) ||
            (erArbeidslisteTom && kanLeggeIArbeidsliste) ||
            (!erHuskelappTom && kanRedigereHuskelapp) ||
            (!erArbeidslisteTom && kanRedigereArbeidsliste));

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
                <ArbeidslisteKnapp
                    hidden={!(kanLeggeIArbeidsliste || kanRedigereArbeidsliste) || features[HUSKELAPP]}
                    onClick={klikkShowArbeidslisteModal}
                    kanRedigereArbeidsliste={kanRedigereArbeidsliste}
                />
                {features[HUSKELAPP] && !!tilgangTilBrukersKontor?.tilgangTilBrukersKontor && (
                    <Fargekategoriknapp disabled={!kanEndreFargekategori} />
                )}
                <HuskelappKnapp
                    hidden={!visHuskelappknapp}
                    onClick={klikkShowHuskelapp}
                    harHuskelappEllerArbeidsliste={!erHuskelappTom || !erArbeidslisteTom}
                />
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
