import { fork, all } from 'redux-saga/effects';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createReduxSaga from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import oppfolgingReducer from './oppfolging/reducer';
import oppfolgingStatusReducer, { oppfolgingstatusSaga } from './oppfolging-status/reducer';
import personaliaReducer, { personaliaSaga } from './personalia/reducer';
import arbeidslisteReducer, { arbeidslisteSaga } from './arbeidsliste/reducer';
import dialogReducer, { dialogSaga } from './dialog/reducer';
import navigationReducer from './navigation/reducer';
import tildelVelederReducer, { tildelVeilederSaga } from './tildel-veileder/reducer';
import tilgangTilBrukersKontorReducer, { tilgangTilBrukersKontorSaga } from './tilgang-til-brukerskontor/reducer';
import { oppfolgingSaga } from './oppfolging/sagas';
import instillingshistorikkReducer, { instillingshistorikkSaga } from './innstillingshistorikk/reducer';
import oppgavehistorikkReducer, { oppgaveHistorikkSaga } from './oppgave/reducer';
import enhetIdReducer from './enhet/reducer';
import toastsReducer from './toast/reducer';
import avsluttOppfolgingStatusReducer, { avsluttOppfolgingStatusSaga } from './avslutningstatus/reducer';
import aktivitetReducer, { hentHarTiltakSaga } from './aktivitet/reducer';

const sagaMiddleware = createReduxSaga();

const uiReducers = combineReducers({
    navigation: navigationReducer,
    toasts: toastsReducer,
});

const store = createStore(
    combineReducers({
        oppfolging: oppfolgingReducer,
        oppfolgingstatus: oppfolgingStatusReducer,
        personalia: personaliaReducer,
        arbeidsliste: arbeidslisteReducer,
        dialoger: dialogReducer,
        tildelVeileder: tildelVelederReducer,
        tilgangTilBrukersKontor: tilgangTilBrukersKontorReducer,
        instillingshistorikk: instillingshistorikkReducer,
        oppgavehistorikk: oppgavehistorikkReducer,
        enhetId: enhetIdReducer,
        avsluttOppfolgingStatus: avsluttOppfolgingStatusReducer,
        ui: uiReducers,
        aktivitet: aktivitetReducer,
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function* rootSaga() {
    yield all([
        fork(oppfolgingSaga),
        fork(personaliaSaga),
        fork(oppfolgingstatusSaga),
        fork(arbeidslisteSaga),
        fork(dialogSaga),
        fork(tildelVeilederSaga),
        fork(tilgangTilBrukersKontorSaga),
        fork(instillingshistorikkSaga),
        fork(oppgaveHistorikkSaga),
        fork(avsluttOppfolgingStatusSaga),
        fork(hentHarTiltakSaga),
    ]);
}

sagaMiddleware.run(rootSaga);

export default store;
