import Dropdown from "../components/dropdown/dropdown";

function TildelVeileder() {
    return (
        <Dropdown
            knappeTekst={'Tildel veileder'}
            className="input-m tildel-veileder-dropdown"
            name="tildel-veileder-dropdown"
            onLukk={() => "hello world" }
        >

            <button>hepps</button>
        </Dropdown>);
}

export default TildelVeileder;