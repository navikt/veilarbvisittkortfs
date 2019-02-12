import Modal from "../components/modal/modal";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";

function FjernArbeidsliste(props:{isOpen: boolean, onRequestClose: () => void}){
    return(
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            innholdstittel="Fjern"
        >
            <Hovedknapp>Slett</Hovedknapp>
            <Knapp>Avbryt</Knapp>
        </Modal>
    )
}

export default FjernArbeidsliste;