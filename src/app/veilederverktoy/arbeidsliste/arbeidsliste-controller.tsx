import React, { useState } from 'react';
import { Arbeidsliste, ArbeidslisteformData } from '../../../types/arbeidsliste';
import { Knapp } from 'nav-frontend-knapper';
import ArbeidslisteIkon from './arbeidsliste.svg';
import FjernArbeidsliste from './fjern-arbeidsliste';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import PersonaliaSelectors from '../../../store/personalia/selectors';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import RedigerArbeidsliste from './rediger-arbeidsliste';
import { Dispatch } from 'redux';
import { oppdaterArbeidsliste, redigerArbeidsliste, slettArbeidsliste } from '../../../store/arbeidsliste/actions';
import { FormikValues } from 'formik';
import ArbeidslisteSelector from '../../../store/arbeidsliste/selector';
import { HiddenIfHovedKnapp, HiddenIfKnapp } from '../../components/hidden-if/hidden-if-knapp';
import moment from 'moment';

interface StateProps {
    arbeidsliste: Arbeidsliste;
    fnr: string;
    navn: string;
    arbeidslisteStatus: boolean;
    kanLeggeIArbeidsliste: boolean;
    kanFjerneArbeidsliste: boolean;
}

interface DispatchProps {
    doSlettArbeidsliste: (fnr: string) => void;
    lagreArbeidsliste: (values: any) => void;
    redigerArbeidsliste: (values: any) => void;
}

type ArbeidslisteStateProps = StateProps & DispatchProps;

export const dateToISODate = (dato: string) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.toISOString() : null;
};

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
                <HiddenIfHovedKnapp
                    className="arbeidsliste__knapp"
                    htmlType="button"
                    onClick={() => setLeggTilArbeidslisteAktivt(true)}
                    hidden={!props.kanLeggeIArbeidsliste}
                >
                    <img src={ArbeidslisteIkon} alt="Legg til i arbeidsliste"/>
                    Legg til i arbeidsliste
                </HiddenIfHovedKnapp>
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
            <HiddenIfKnapp
                className="arbeidsliste__knapp"
                htmlType="button" onClick={() => setFjernArbeidslisteAktivt(true)}
                hidden={!props.kanFjerneArbeidsliste}
            >
                <img src={ArbeidslisteIkon} alt="Fjern fra arbeidsliste"/>
                <span>Fjern</span>
            </HiddenIfKnapp>
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
    arbeidslisteStatus: ArbeidslisteSelector.selectArbeidslisteStatus(state),
    kanLeggeIArbeidsliste: ArbeidslisteSelector.selectKanLeggeIArbeidsListe(state),
    kanFjerneArbeidsliste: ArbeidslisteSelector.selectKanFjerneArbeidsliste(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
   doSlettArbeidsliste : (fnr: string) => dispatch(slettArbeidsliste(fnr)),
    lagreArbeidsliste: (values: FormikValues) => dispatch(
        oppdaterArbeidsliste({
            kommentar: values.kommentar,
            overskrift: values.overskrift,
            frist: values.frist ? dateToISODate(values.frist) : null} as ArbeidslisteformData)
    ),
    redigerArbeidsliste: (values: FormikValues) => dispatch(
        redigerArbeidsliste({
            kommentar: values.kommentar,
            overskrift: values.overskrift,
            frist: values.frist ? dateToISODate(values.frist) : null
        } as ArbeidslisteformData))

});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ArbeidslisteController);