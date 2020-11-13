import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Appstate } from '../../types/appstate';
import PersonaliaSelectors from '../../store/personalia/selectors';
import ArbeidslisteModal from './arbeidsliste-modal';
import { Dispatch } from 'redux';
import { oppdaterArbeidsliste, redigerArbeidsliste, slettArbeidsliste } from '../../store/arbeidsliste/actions';
import ArbeidslisteSelector from '../../store/arbeidsliste/selector';
import moment from 'moment';
import FjernArbeidslisteModal from './fjern-arbeidsliste-modal';
import './arbeidsliste.less';
import { navigerAction } from '../../store/navigation/actions';
import { Arbeidsliste, ArbeidslisteformValues } from '../../api/data/arbeidsliste';

interface StateProps {
    arbeidsliste: Arbeidsliste;
    fnr: string;
    navn: string;
    arbeidslisteStatus: boolean;
    kanFjerneArbeidsliste: boolean;
}

interface DispatchProps {
    doSlettArbeidsliste: () => void;
    lagreArbeidsliste: (values: ArbeidslisteformValues) => void;
    redigerArbeidsliste: (values: ArbeidslisteformValues) => void;
}

type ArbeidslisteStateProps = StateProps & DispatchProps;

export const dateToISODate = (dato: string) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.toISOString() : null;
};

function ArbeidslisteController(props: ArbeidslisteStateProps) {
    const [slettArbeidslisteModal, setSlettArbeidslisteModal] = useState(false);

    const dispatch = useDispatch();

    function deleteArbeidsliste() {
        setSlettArbeidslisteModal(true);
    }

    function slettArbeidslisteOgLukkModaler() {
        setSlettArbeidslisteModal(false);
        dispatch(navigerAction(null));
        props.doSlettArbeidsliste();
    }

    return (
        <>
            <ArbeidslisteModal
                isOpen={true}
                lukkModal={() => dispatch(navigerAction(null))}
                arbeidsliste={props.arbeidsliste}
                fnr={props.fnr}
                navn={props.navn}
                arbeidslisteStatus={props.arbeidslisteStatus}
                onSubmit={props.arbeidsliste.endringstidspunkt ? props.redigerArbeidsliste : props.lagreArbeidsliste}
                onDelete={deleteArbeidsliste}
                kanFjerneArbeidsliste={props.kanFjerneArbeidsliste}
                tittel={props.arbeidsliste.endringstidspunkt ? 'Rediger arbeidsliste' : 'Legg i arbeidsliste'}
            />
            <FjernArbeidslisteModal
                isOpen={slettArbeidslisteModal}
                onRequestClose={() => setSlettArbeidslisteModal(false)}
                onSubmit={slettArbeidslisteOgLukkModaler}
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
    kanFjerneArbeidsliste: ArbeidslisteSelector.selectKanFjerneArbeidsliste(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    doSlettArbeidsliste: () => dispatch(slettArbeidsliste()),
    lagreArbeidsliste: (values: ArbeidslisteformValues) =>
        dispatch(
            oppdaterArbeidsliste({
                kommentar: values.kommentar,
                overskrift: values.overskrift,
                frist: values.frist ? dateToISODate(values.frist) : null,
                kategori: values.kategori,
            })
        ),
    redigerArbeidsliste: (values: ArbeidslisteformValues) =>
        dispatch(
            redigerArbeidsliste({
                kommentar: values.kommentar,
                overskrift: values.overskrift,
                frist: values.frist ? dateToISODate(values.frist) : null,
                kategori: values.kategori,
            })
        ),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ArbeidslisteController);
