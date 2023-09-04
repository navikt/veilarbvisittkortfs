import React from 'react';
import NavnOgAlder from './components/navnogalder';
import KjonnIkon from './components/kjonn-ikon';
import ArbeidslisteKnapp from '../arbeidsliste/arbeidsliste-knapp';
import { KopierKnappTekst } from '../components/kopier-knapp/kopier-knapp';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import { selectKanLeggeIArbeidsListe, selectKanRedigereArbeidsliste, selectSammensattNavn } from '../../util/selectors';
import { useModalStore } from '../../store/modal-store';
import './personinfo.less';
import { logMetrikk } from '../../util/logger';
import { formaterTelefonnummer } from '../../util/utils';
import { StringOrNothing } from '../../util/type/utility-types';
import { VEILARBDETALJERFS_ENABLED } from '../../api/veilarbpersonflatefs';
import { Label } from '@navikt/ds-react';

function PersonInfo() {
    const { brukerFnr } = useAppStore();
    const { personalia, arbeidsliste, oppfolgingsstatus, innloggetVeileder, features } = useDataStore();
    const { showArbeidslisteModal } = useModalStore();

    const arbeidslisteikon = arbeidsliste?.kategori;

    const navn = selectSammensattNavn(personalia);
    const kanLeggeIArbeidsliste = selectKanLeggeIArbeidsListe(innloggetVeileder, oppfolgingsstatus, arbeidsliste);
    const kanRedigereArbeidsliste = selectKanRedigereArbeidsliste(arbeidsliste);

    const klikk = () => {
        logMetrikk('veilarbvisittkortfs.metrikker.visittkort.arbeidsliste-ikon', { kategori: arbeidslisteikon });
        showArbeidslisteModal();
    };
    const uformattertTelefon: StringOrNothing = personalia?.telefon?.find(entry => entry.prioritet === '1')?.telefonNr;
    const telefon: string = formaterTelefonnummer(uformattertTelefon);

    return (
        <div className="personinfo">
            <KjonnIkon visible={personalia?.kjonn} kjonn={personalia?.kjonn as string} />
            <NavnOgAlder navn={navn} personalia={personalia} />
            <div className="arbeidsliste">
                <ArbeidslisteKnapp
                    hidden={!(kanLeggeIArbeidsliste || kanRedigereArbeidsliste)}
                    onClick={klikk}
                    kanRedigereArbeidsliste={kanRedigereArbeidsliste}
                />
                <KopierKnappTekst kopierTekst={brukerFnr} visTekst={`F.nr.: ${brukerFnr}`} />
                {features[VEILARBDETALJERFS_ENABLED] && <Label>/</Label>}
                {uformattertTelefon && features[VEILARBDETALJERFS_ENABLED] && (
                    <KopierKnappTekst kopierTekst={uformattertTelefon} visTekst={`Tlf.: ${telefon}`} />
                )}
                {!uformattertTelefon && features[VEILARBDETALJERFS_ENABLED] && (
                    <Label className="uten-telefon">Tlf.: -</Label>
                )}
            </div>
        </div>
    );
}

export default PersonInfo;
