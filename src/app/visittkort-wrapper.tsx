import Tilbakelenke from './components/tilbakelenke/tilbakelenke';
import React from 'react';
import { AppProps } from '../app';

function VisittkortWrapper(props: AppProps & { children: React.ReactNode }) {
    return (
        <div className="visittkortfs">
            <Tilbakelenke enhet={props.enhet} fnr={props.fnr} tilbakeTilFlate={props.tilbakeTilFlate} />
            <div className="visittkortfs__container">{props.children}</div>
        </div>
    );
}

export default VisittkortWrapper;
