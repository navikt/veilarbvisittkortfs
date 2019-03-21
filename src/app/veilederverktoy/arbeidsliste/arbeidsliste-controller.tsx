import React, { useEffect, useState } from 'react';
import { Arbeidsliste, ArbeidslisteformData, ArbeidslisteformValues } from '../../../types/arbeidsliste';
import ArbeidslisteIkon from './arbeidsliste.svg';
import RedigerIkon from './rediger.svg';
import FjernArbeidslisteModal from './fjern-arbeidsliste-modal';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import PersonaliaSelectors from '../../../store/personalia/selectors';
import LeggTilArbeidslisteModal from './legg-til-arbeidsliste-modal';
import RedigerArbeidslisteModal from './rediger-arbeidsliste-modal';
import { Dispatch } from 'redux';
import { oppdaterArbeidsliste, redigerArbeidsliste, slettArbeidsliste } from '../../../store/arbeidsliste/actions';
import ArbeidslisteSelector from '../../../store/arbeidsliste/selector';
import { HiddenIfKnappFss } from '../../components/hidden-if/hidden-if-knapp';
import moment from 'moment';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentArbeidsliste } from '../../../store/arbeidsliste/actions';

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
    doSlettArbeidsliste: (fnr: string) => void;
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
    const [leggTilArbeidsliste, setLeggTilArbeidslisteAktivt] = useState( false);
    const [fjernArbeidsliste, setFjernArbeidslisteAktivt] = useState( false);
    const [visKommentar, setVisKommentarAktivt] = useState( false);

    useEffect(() => {props.hentArbeidsliste(props.fnr); }, []);

    if (props.isLoading) {
        return <NavFrontendSpinner type="XL"/>;
    }
    return (
        <>
            <HiddenIfKnappFss
                icon={ArbeidslisteIkon}
                onClick={() => setLeggTilArbeidslisteAktivt(true)}
                hidden={!props.kanLeggeIArbeidsliste}
            >
                Legg i arbeidsliste
            </HiddenIfKnappFss>
            <HiddenIfKnappFss
                icon={ArbeidslisteIkon}
                onClick={() => setFjernArbeidslisteAktivt(true)}
                hidden={!props.kanFjerneArbeidsliste}
            >
                Fjern
            </HiddenIfKnappFss>
            <HiddenIfKnappFss
                icon={RedigerIkon}
                onClick={() => setVisKommentarAktivt(true)}
                hidden={!props.kanRedigereArbeidsliste}
            >
                Rediger
            </HiddenIfKnappFss>
            <LeggTilArbeidslisteModal
                isOpen={leggTilArbeidsliste}
                lukkModal={() => setLeggTilArbeidslisteAktivt(false)}
                arbeidsliste={props.arbeidsliste}
                fnr={props.fnr}
                navn={props.navn}
                arbeidslisteStatus={props.arbeidslisteStatus}
                onSubmit={props.lagreArbeidsliste}
            />
            <RedigerArbeidslisteModal
                isOpen={visKommentar}
                lukkModal={() => setVisKommentarAktivt(false)}
                arbeidsliste={props.arbeidsliste}
                fnr={props.fnr}
                navn={props.navn}
                arbeidslisteStatus={props.arbeidslisteStatus}
                onSubmit={props.redigerArbeidsliste}
            />
            <FjernArbeidslisteModal
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
    kanFjerneArbeidsliste: ArbeidslisteSelector.selectKanFjerneArbeidsliste(state),
    kanRedigereArbeidsliste: ArbeidslisteSelector.selectKanRedigereArbeidsliste(state),
    isLoading: ArbeidslisteSelector.selectArbeidslisteStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    doSlettArbeidsliste : (fnr: string) => dispatch(slettArbeidsliste(fnr)),
    lagreArbeidsliste: (values: ArbeidslisteformValues) => dispatch(
        oppdaterArbeidsliste({
            kommentar: values.kommentar,
            overskrift: values.overskrift,
            frist: values.frist ? dateToISODate(values.frist) : null} as ArbeidslisteformData)
    ),
    redigerArbeidsliste: (values: ArbeidslisteformValues) => dispatch(
        redigerArbeidsliste({
            kommentar: values.kommentar,
            overskrift: values.overskrift,
            frist: values.frist ? dateToISODate(values.frist) : null
        } as ArbeidslisteformData)
    ),
    hentArbeidsliste: (fnr: string) => dispatch(hentArbeidsliste(fnr))

});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ArbeidslisteController);
