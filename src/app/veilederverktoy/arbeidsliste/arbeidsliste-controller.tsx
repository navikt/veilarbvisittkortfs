import React, { useState } from 'react';
import { Arbeidsliste } from '../../../types/arbeidsliste';
import { Knapp } from 'nav-frontend-knapper';
import ArbeidslisteIkon from './arbeidsliste.svg';
import FjernArbeidsliste from './fjern-arbeidsliste';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import PersonaliaSelectors from '../../../store/personalia/selectors';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import RedigerArbeidsliste from './rediger-arbeidsliste';
import { Dispatch } from 'redux';
import {oppdaterArbeidsliste, slettArbeidsliste} from '../../../store/arbeidsliste/actions';
import {FormikValues} from "formik";

interface StateProps {
    arbeidsliste: Arbeidsliste;
    fnr: string;
    navn: string;
    arbeidslisteStatus: boolean;
}

interface DispatchProps {
    doSlettArbeidsliste: (fnr: string) => void;
    lagreArbeidsliste: (values: any) => void;
    redigerArbeidsliste: (values: any) => void;
}

type ArbeidslisteStateProps = StateProps & DispatchProps;

function ArbeidslisteController (props: ArbeidslisteStateProps) {
    const [leggTilArbeidsliste, setLeggTilArbeidslisteAktivt] = useState( false);
    const [fjernArbeidsliste, setFjernArbeidslisteAktivt] = useState( false);
    const [visKommentar, setVisKommentarAktivt] = useState( false);

    if (!props.arbeidsliste.harVeilederTilgang) {
        return <div/>;
    }

    if (!props.arbeidsliste.endringstidspunkt) {
        return(
            <>
                <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={() => setLeggTilArbeidslisteAktivt(true)}>
                    <img src={ArbeidslisteIkon} alt="Legg til i arbeidsliste"/>
                    Legg til i arbeidsliste
                </Knapp>
                <LeggTilArbeidsliste
                    isOpen={leggTilArbeidsliste}
                    lukkModal={() => setLeggTilArbeidslisteAktivt(false)}
                    arbeidsliste={props.arbeidsliste}
                    fnr={props.fnr}
                    navn={props.navn}
                    arbeidslisteStatus={props.arbeidslisteStatus}
                    onSubmit={props.lagreArbeidsliste}
                />
            </>
        );
    }
    return (
        <>
            <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={() => setFjernArbeidslisteAktivt(true)}>
                <img src={ArbeidslisteIkon} alt="Fjern fra arbeidsliste"/>
                <span>Fjern</span>
            </Knapp>
            <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={() => setVisKommentarAktivt(true)}>
                <span>Vis kommentar</span>
            </Knapp>
            <RedigerArbeidsliste
                isOpen={visKommentar}
                lukkModal={() => setVisKommentarAktivt(false)}
                arbeidsliste={props.arbeidsliste}
                fnr={props.fnr}
                navn={props.navn}
                arbeidslisteStatus={props.arbeidslisteStatus}
                onSubmit={props.redigerArbeidsliste}
            />
            <FjernArbeidsliste
                isOpen={fjernArbeidsliste}
                onRequestClose={() => setFjernArbeidslisteAktivt(false)}
                onSubmit={props.doSlettArbeidsliste}
                fnr={props.fnr}
                navn={props.navn}
            />
        </>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    arbeidsliste: state.arbeidsliste.data,
    fnr: PersonaliaSelectors.selectFodselsnummer(state),
    navn: PersonaliaSelectors.selectSammensattNavn(state),
    arbeidslisteStatus: state.arbeidsliste.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
   doSlettArbeidsliste : (fnr: string) => dispatch(slettArbeidsliste(fnr)),
    lagreArbeidsliste: (values: FormikValues) => dispatch(
        oppdaterArbeidsliste({kommentar: values.kommentar, overskrift: values.overskrift, frist: values.frist})
    ),
    redigerArbeidsliste: (values: FormikValues) => dispatch(
        oppdaterArbeidsliste({kommentar: values.kommentar, overskrift: values.overskrift, frist: values.frist})
    )

});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ArbeidslisteController);