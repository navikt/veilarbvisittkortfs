import React, { useMemo, useState } from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import SokFilter from '../../components/sokfilter/sok-filter';
import RadioFilterForm from '../../components/radiofilterform/radio-filter-form';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { VeilederData } from '../../../api/data/veilederdata';
import { useAppStore } from '../../../store-midlertidig/app-store';
import { lagVeilederSammensattNavn } from '../../../util/selectors';
import { ModalType, useModalStore } from '../../../store-midlertidig/modal-store';
import { triggerReRenderingAvMao } from '../../../util/utils';
import { tildelTilVeileder } from '../../../api/api-midlertidig';
import { useDataStore } from '../../../store-midlertidig/data-store';
import './tildel-veileder.less';

function TildelVeileder() {
    const { brukerFnr } = useAppStore();
    const { showTildelVeilederKvitteringModal, showModal, hideModal } = useModalStore();
    const { veilederePaEnhet, oppfolging, setOppfolging } = useDataStore();
    const [selectedVeilederId, setSelectedVeilederId] = useState('');

    const veiledere = veilederePaEnhet?.veilederListe || [];
    const fraVeileder = oppfolging.veilederId;

    const sorterteVeiledere = useMemo(() => {
        return veiledere.sort((a, b) => a.etternavn.localeCompare(b.etternavn));
    }, [veiledere]);

    const handleSubmitTildelVeileder = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        document
            .querySelectorAll('input[type=radio]:checked')
            .forEach((elem) => ((elem as HTMLInputElement).checked = false));

        tildelTilVeileder([
            {
                fraVeilederId: fraVeileder,
                tilVeilederId: selectedVeilederId,
                brukerFnr,
            },
        ])
            .then((res) => {
                if (res.data.feilendeTilordninger.length > 0) {
                    throw new Error('Tildeling feilet');
                }

                // Oppdater oppfølging med ny veileder
                setOppfolging((prevOppfolging) => ({ ...prevOppfolging, veilederId: selectedVeilederId }));

                const veilederNavn =
                    veiledere
                        .filter((v) => v.ident === selectedVeilederId)
                        .map((v) => lagVeilederSammensattNavn(v))[0] || 'Ukjent veileder';

                showTildelVeilederKvitteringModal({ tildeltVeilederNavn: veilederNavn });
                triggerReRenderingAvMao();
            })
            .catch(() => showModal(ModalType.TILDEL_VEILEDER_FEILET));
    };

    return (
        <VeilederVerktoyModal tittel="Tildel veileder">
            <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmitTildelVeileder(event)}
                className="tildel-veileder__form"
            >
                <SokFilter data={sorterteVeiledere} label="" placeholder="Søk navn eller NAV-ident">
                    {(data) => (
                        <RadioFilterForm
                            data={data}
                            createLabel={lagVeilederSammensattNavn}
                            createValue={(veileder: VeilederData) => veileder.ident}
                            radioName="tildel-veileder"
                            selected={selectedVeilederId}
                            changeSelected={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setSelectedVeilederId(e.target.value)
                            }
                        />
                    )}
                </SokFilter>
                <div className="modal-footer">
                    <Hovedknapp className="btn--mr1" htmlType="submit" disabled={!selectedVeilederId}>
                        Velg
                    </Hovedknapp>
                    <Knapp htmlType="button" onClick={hideModal}>
                        Lukk
                    </Knapp>
                </div>
            </form>
        </VeilederVerktoyModal>
    );
}

export default TildelVeileder;
