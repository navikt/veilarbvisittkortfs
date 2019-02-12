import * as React from 'react';
import {Innholdstittel, Undertittel} from "nav-frontend-typografi";

function ModalContainer (props: {children: React.ReactNode, innholdstittel: string, undertittel?: string}) {
    return(
        <>
        <div className="modal-header-wrapper">
            <header/>
          </div>
         <div className="modal-container">
             <Innholdstittel>{props.innholdstittel}</Innholdstittel>
             {props.undertittel && <Undertittel>{props.undertittel}</Undertittel>}
             {props.children}
         </div>
         </>
    )
}

export default ModalContainer;