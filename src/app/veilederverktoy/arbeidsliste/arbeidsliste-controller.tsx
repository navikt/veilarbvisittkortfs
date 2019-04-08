import React, { useEffect, useState } from 'react';
import { Arbeidsliste, ArbeidslisteformValues } from '../../../types/arbeidsliste';

import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import PersonaliaSelectors from '../../../store/personalia/selectors';
import ArbeidslisteModal from './arbeidsliste-modal';
import { Dispatch } from 'redux';
import { oppdaterArbeidsliste, redigerArbeidsliste } from '../../../store/arbeidsliste/actions';
import ArbeidslisteSelector from '../../../store/arbeidsliste/selector';
import moment from 'moment';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentArbeidsliste } from '../../../store/arbeidsliste/actions';
import { ToastActionType, visFjernArbeidslisteToast } from '../../../store/toast/actions';
import ArbeidslisteKnapp from './arbeidsliste-knapp';

interface StateProps {
    arbeidsliste: Arbeidsliste;
    fnr: string;
    navn: string;
    arbeidslisteStatus: boolean;
    kanLeggeIArbeidsliste: boolean;
    kanFjerneArbeidsliste: boolean;
    kanRedigereArbeidsliste: boolean;
    isLoading: boolean;
    visFjernArbeidslisteToast: boolean;
}

interface DispatchProps {
    doSlettArbeidsliste: () => void;
    lagreArbeidsliste: (values: ArbeidslisteformValues) => void;
    redigerArbeidsliste: (values: ArbeidslisteformValues) => void;
    hentArbeidsliste: (fnr: string) => void;
}

type ArbeidslisteStateProps = StateProps & DispatchProps;

export const dateToISODate = (dato: string) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.toISOString() : null;
};

function ArbeidslisteController (props: ArbeidslisteStateProps) {
    const [visArbeidsliste, setVisArbeidsliste] = useState( false);

    useEffect(() => {props.hentArbeidsliste(props.fnr); }, []);

    if (props.isLoading) {
        return <NavFrontendSpinner type="XL"/>;
    }

    return (
        <>
            <ArbeidslisteKnapp
                hidden={!(props.kanLeggeIArbeidsliste || props.kanRedigereArbeidsliste)}
                onClick={() => setVisArbeidsliste(true)}
                kanRedigereArbeidsliste={props.kanRedigereArbeidsliste}
                ifylldIkon={props.kanRedigereArbeidsliste && !props.visFjernArbeidslisteToast}
            />
            <ArbeidslisteModal
                isOpen={visArbeidsliste}
                lukkModal={() => setVisArbeidsliste(false)}
                arbeidsliste={props.arbeidsliste}
                fnr={props.fnr}
                navn={props.navn}
                arbeidslisteStatus={props.arbeidslisteStatus}
                onSubmit={props.arbeidsliste.endringstidspunkt ? props.redigerArbeidsliste : props.lagreArbeidsliste}
                onDelete={props.doSlettArbeidsliste}
                kanFjerneArbeidsliste={props.kanFjerneArbeidsliste}
                visFjernArbeidslisteToast={props.visFjernArbeidslisteToast}
            />
        </>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    arbeidsliste: state.arbeidsliste.data,
    fnr: PersonaliaSelectors.selectFodselsnummer(state),
    navn: PersonaliaSelectors.selectSammensattNavn(state),
    arbeidslisteStatus: ArbeidslisteSelector.selectArbeidslisteStatus(state),
    kanLeggeIArbeidsliste: ArbeidslisteSelector.selectKanLeggeIArbeidsListe(state),
    kanFjerneArbeidsliste: ArbeidslisteSelector.selectKanFjerneArbeidsliste(state),
    kanRedigereArbeidsliste: ArbeidslisteSelector.selectKanRedigereArbeidsliste(state),
    isLoading: ArbeidslisteSelector.selectArbeidslisteStatus(state),
    visFjernArbeidslisteToast: !!state.ui.toasts.toasts.find(toast => toast === ToastActionType.VIS_ARBEIDSLISTE_TOAST)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    doSlettArbeidsliste : () => dispatch(visFjernArbeidslisteToast()),
    lagreArbeidsliste: (values: ArbeidslisteformValues) => dispatch(
        oppdaterArbeidsliste({
            kommentar: values.kommentar,
            overskrift: values.overskrift,
            frist: values.frist ? dateToISODate(values.frist) : null})
    ),
    redigerArbeidsliste: (values: ArbeidslisteformValues) => dispatch(
        redigerArbeidsliste({
            kommentar: values.kommentar,
            overskrift: values.overskrift,
            frist: values.frist ? dateToISODate(values.frist) : null
        })
    ),
    hentArbeidsliste: (fnr: string) => dispatch(hentArbeidsliste(fnr))

});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ArbeidslisteController);
