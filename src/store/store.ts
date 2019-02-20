import { fork, all } from 'redux-saga/effects';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createReduxSaga from 'redux-saga';
import oppfolgingReducer from './oppfolging/reducer';
import oppfolgingStatusReducer, { oppfolgingstatusSaga } from './oppfolging-status/reducer';
import personaliaReducer, { personaliaSaga } from './personalia/reducer';
import arbeidslisteReducer, { arbeidslisteSaga } from './arbeidsliste/reducer';
import dialogReducer, { dialogSaga } from './dialog/reducer';
import navigationReducer from './navigation/reducer';
import tildelVelederReducer, { tildelVeilederSaga } from './tildel-veileder/reducer';
import tilgangTilBrukersKontorReducer, { tilgangTilBrukersKontorSaga } from './tilgang-til-brukerskontor/reducer';
import { oppfolgingSaga } from './oppfolging/sagas';

const sagaMiddleware = createReduxSaga();

const store = createStore(
    combineReducers({
        oppfolging: oppfolgingReducer,
        oppfolgingstatus: oppfolgingStatusReducer,
        personalia: personaliaReducer,
        arbeidsliste: arbeidslisteReducer,
        dialog: dialogReducer,
        navigation: navigationReducer,
        tildelVeileder: tildelVelederReducer,
        tilgangTilBrukersKontor : tilgangTilBrukersKontorReducer,
    }),
    applyMiddleware(sagaMiddleware)
);

function* rootSaga() {
    yield all([
        fork(oppfolgingSaga),
        fork(personaliaSaga),
        fork(oppfolgingstatusSaga),
        fork(arbeidslisteSaga),
        fork(dialogSaga),
        fork(tildelVeilederSaga),
        fork(tilgangTilBrukersKontorSaga)
    ]);
}

sagaMiddleware.run(rootSaga);

export default store;