import React, { useState } from 'react';
import ArbeidslisteModal from './arbeidsliste-modal';
import FjernArbeidslisteModal from './fjern-arbeidsliste-modal';
import { dateToISODate } from '../../util/date-utils';
import { useModalStore } from '../../store/modal-store';
import { useDataStore } from '../../store/data-store';
import { useAppStore } from '../../store/app-store';
import { kanFjerneArbeidsliste, selectSammensattNavn } from '../../util/selectors';
import './arbeidsliste.less';
import {
    Arbeidsliste,
    ArbeidslisteformValues,
    lagreArbeidsliste,
    redigerArbeidsliste,
    slettArbeidsliste,
} from '../../api/veilarbportefolje';
import { ifResponseHasData } from '../../util/utils';

function ArbeidslisteControllerModal() {
    const { brukerFnr } = useAppStore();
    const { arbeidsliste, oppfolging, innloggetVeileder, personalia, setArbeidsliste } = useDataStore();
    const { hideModal, showSpinnerModal, showErrorModal } = useModalStore();

    const brukerSammensattNavn = selectSammensattNavn(personalia);
    const arbeidslisteStatus = false; // TODO: true -> arbeidslisteStatus === 'NOT_STARTED' || arbeidslisteStatus === 'LOADING'

    const kanFjernesFraArbeidsliste =
        !!arbeidsliste && kanFjerneArbeidsliste(arbeidsliste, oppfolging, innloggetVeileder.ident);

    // TODO: når man trykke på avbryt så fungerer ikke ArbeidslisteControllerModal
    // TODO: Hvis man tildeler veileder til en annen, så står fortsatt knappen for å lage arbeidsliste til refresh

    const [visArbeidslisteModal, setVisArbeidslisteModal] = useState(true);
    const [visFjernArbeidslisteModal, setVisFjernArbeidslisteModal] = useState(false);

    function handleOnArbeidslisteModalDeleteClicked() {
        setVisArbeidslisteModal(false);
        setVisFjernArbeidslisteModal(true);
    }

    function slettArbeidslisteOgLukkModaler() {
        setVisFjernArbeidslisteModal(false);
        showSpinnerModal();

        slettArbeidsliste(brukerFnr)
            .then(() => {
                setArbeidsliste(undefined);
                hideModal();
            })
            .catch(showErrorModal);
    }

    function handleOnLagreArbeidsliste(values: ArbeidslisteformValues) {
        const formValus: ArbeidslisteformValues = {
            kommentar: values.kommentar,
            overskrift: values.overskrift,
            frist: values.frist ? dateToISODate(values.frist) : null,
            kategori: values.kategori,
        };

        showSpinnerModal();

        lagreArbeidsliste(brukerFnr, formValus)
            .then(ifResponseHasData(setArbeidsliste))
            .then(hideModal)
            .catch(showErrorModal);
    }

    function handleOnRedigerArbeidsliste(values: ArbeidslisteformValues) {
        const formValus: ArbeidslisteformValues = {
            kommentar: values.kommentar,
            overskrift: values.overskrift,
            frist: values.frist ? dateToISODate(values.frist) : null,
            kategori: values.kategori,
        };

        showSpinnerModal();

        redigerArbeidsliste(brukerFnr, formValus)
            .then(ifResponseHasData(setArbeidsliste))
            .then(hideModal)
            .catch(showErrorModal);
    }

    return (
        <>
            <ArbeidslisteModal
                isOpen={visArbeidslisteModal}
                lukkModal={() => setVisArbeidslisteModal(false)}
                arbeidsliste={arbeidsliste as Arbeidsliste}
                fnr={brukerFnr}
                navn={brukerSammensattNavn}
                arbeidslisteStatus={arbeidslisteStatus}
                onSubmit={arbeidsliste?.endringstidspunkt ? handleOnRedigerArbeidsliste : handleOnLagreArbeidsliste}
                onDelete={handleOnArbeidslisteModalDeleteClicked}
                kanFjerneArbeidsliste={kanFjernesFraArbeidsliste}
                tittel={arbeidsliste?.endringstidspunkt ? 'Rediger arbeidsliste' : 'Legg i arbeidsliste'}
            />
            <FjernArbeidslisteModal
                isOpen={visFjernArbeidslisteModal}
                onRequestClose={() => setVisFjernArbeidslisteModal(false)}
                onSubmit={slettArbeidslisteOgLukkModaler}
                fnr={brukerFnr}
                navn={brukerSammensattNavn}
            />
        </>
    );
}

export default ArbeidslisteControllerModal;
