import { Provider } from 'react-redux';
import store from '../store/store';
import { IntlProvider } from 'react-intl';
import InitialDataProvider from './components/initialdataprovider';
import React from 'react';
import messageBundle from '../tekster-built/bundle';

function AppProvider(props: { fnr: string; children: React.ReactNode; enhet?: string }) {
    return (
        <Provider store={store}>
            <IntlProvider locale="nb" messages={messageBundle.nb}>
                <InitialDataProvider fnr={props.fnr} enhet={props.enhet}>
                    {props.children}
                </InitialDataProvider>
            </IntlProvider>
        </Provider>
    );
}

export default AppProvider;
