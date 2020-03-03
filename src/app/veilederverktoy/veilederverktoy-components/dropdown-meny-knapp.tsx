import React from 'react';
import visibleIf from '../../components/visible-if';

function DropdownMenyKnapp(props: { menyTekst: string; onClick: () => void }) {
    return <button onClick={props.onClick}>{props.menyTekst}</button>;
}

export default visibleIf(DropdownMenyKnapp);
