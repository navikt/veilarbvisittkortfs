import React, { useEffect, useState } from 'react';
import { Arbeidsliste, ArbeidslisteformValues } from '../../../types/arbeidsliste';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import PersonaliaSelectors from '../../../store/personalia/selectors';
import ArbeidslisteModal from './arbeidsliste-modal';
import { Dispatch } from 'redux';
import { oppdaterArbeidsliste, redigerArbeidsliste, slettArbeidsliste } from '../../../store/arbeidsliste/actions';
import ArbeidslisteSelector from '../../../store/arbeidsliste/selector';
import moment from 'moment';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentArbeidsliste } from '../../../store/arbeidsliste/actions';
import ArbeidslisteKnapp from './arbeidsliste-knapp';
import FjernArbeidslisteModal from './fjern-arbeidsliste-modal';

interface StateProps {
    arbeidsliste: Arbeidsliste;
    fnr: string;
    navn: string;
    arbeidslisteStatus: boolean;
    kanLeggeIArbeidsliste: boolean;
    kanFjerneArbeidsliste: boolean;
    kanRedigereArbeidsliste: boolean;
    isLoading: boolean;
}

interface DispatchProps {
    doSlettArbeidsliste: () => void;
    lagreArbeidsliste: (values: ArbeidslisteformValues) => void;
    redigerArbeidsliste: (values: ArbeidslisteformValues) => void;
    doHentArbeidsliste: (fnr: string) => void;
}

type ArbeidslisteStateProps = StateProps & DispatchProps & { fjernToastFeature: boolean };

export const dateToISODate = (dato: string) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.toISOString() : null;
};

function ArbeidslisteController(props: ArbeidslisteStateProps) {
    const [visArbeidsliste, setVisArbeidsliste] = useState(false);
    const [slettArbeidslisteModal, setSlettArbeidslisteModal] = useState(false);
    const { fnr, doHentArbeidsliste } = props;

    useEffect(() => {
        doHentArbeidsliste(fnr);
    }, [fnr, doHentArbeidsliste]);

    if (props.isLoading) {
        return <NavFrontendSpinner type="XL" />;
    }

    function deleteArbeidsliste() {
        if (props.fjernToastFeature) {
            setSlettArbeidslisteModal(true);
        } else {
            setVisArbeidsliste(false);
        }
    }

    function slettArbeidslisteOgLukkModaler() {
        setSlettArbeidslisteModal(false);
        setVisArbeidsliste(false);
        props.doSlettArbeidsliste();
    }

    return (
        <>
            <ArbeidslisteKnapp
                hidden={!(props.kanLeggeIArbeidsliste || props.kanRedigereArbeidsliste)}
                onClick={() => setVisArbeidsliste(true)}
                kanRedigereArbeidsliste={props.kanRedigereArbeidsliste}
                ifylldIkon={props.kanRedigereArbeidsliste}
            />
            <ArbeidslisteModal
                isOpen={visArbeidsliste}
                lukkModal={() => setVisArbeidsliste(false)}
                arbeidsliste={props.arbeidsliste}
                fnr={props.fnr}
                navn={props.navn}
                arbeidslisteStatus={props.arbeidslisteStatus}
                onSubmit={props.arbeidsliste.endringstidspunkt ? props.redigerArbeidsliste : props.lagreArbeidsliste}
                onDelete={deleteArbeidsliste}
                kanFjerneArbeidsliste={props.kanFjerneArbeidsliste}
            />
            <FjernArbeidslisteModal
                isOpen={slettArbeidslisteModal}
                onRequestClose={() => setSlettArbeidslisteModal(false)}
                onSubmit={slettArbeidslisteOgLukkModaler}
                fnr={props.fnr}
                navn={props.navn}
                hidden={!props.fjernToastFeature}
            />
        </>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    arbeidsliste: state.arbeidsliste.data,
    fnr: PersonaliaSelectors.selectFodselsnummer(state),
    navn: PersonaliaSelectors.selectSammensattNavn(state),
    arbeidslisteStatus: ArbeidslisteSelector.selectArbeidslisteStatus(state),
    kanLeggeIArbeidsliste:
        state.tildelVeileder.status !== 'LOADING' && ArbeidslisteSelector.selectKanLeggeIArbeidsListe(state),
    kanFjerneArbeidsliste: ArbeidslisteSelector.selectKanFjerneArbeidsliste(state),
    kanRedigereArbeidsliste: ArbeidslisteSelector.selectKanRedigereArbeidsliste(state),
    isLoading: ArbeidslisteSelector.selectArbeidslisteStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    doSlettArbeidsliste: () => dispatch(slettArbeidsliste()),
    lagreArbeidsliste: (values: ArbeidslisteformValues) =>
        dispatch(
            oppdaterArbeidsliste({
                kommentar: values.kommentar,
                overskrift: values.overskrift,
                frist: values.frist ? dateToISODate(values.frist) : null
            })
        ),
    redigerArbeidsliste: (values: ArbeidslisteformValues) =>
        dispatch(
            redigerArbeidsliste({
                kommentar: values.kommentar,
                overskrift: values.overskrift,
                frist: values.frist ? dateToISODate(values.frist) : null
            })
        ),
    doHentArbeidsliste: (fnr: string) => dispatch(hentArbeidsliste(fnr))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ArbeidslisteController);
