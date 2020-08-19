import { Provider } from 'react-redux';
import store from '../store/store';
import InitialDataProvider from './components/initialdataprovider';
import React from 'react';

function AppProvider(props: { fnr: string; children: React.ReactNode; enhet?: string }) {
    return (
        <Provider store={store}>
            <InitialDataProvider fnr={props.fnr} enhet={props.enhet}>
                {props.children}
            </InitialDataProvider>
        </Provider>
    );
}

export default AppProvider;
