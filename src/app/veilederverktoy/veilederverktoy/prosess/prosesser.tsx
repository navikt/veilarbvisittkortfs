import React from 'react';
import VeilederVerktoyModal from "../veilederverktoy-modal";
import StartEskaleringProsess from '../start-eskalering/start-eskalering-prosess';

function Prosesser () {
    return (
        <VeilederVerktoyModal
            ingenTilbakeKnapp={true}
            visConfirmDialog={false}
            touched={false}
        >
            <StartEskaleringProsess/>
        </VeilederVerktoyModal>
    );
}

export default Prosesser;