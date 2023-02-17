import React, { useMemo, useState } from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import SokFilter from '../../components/sokfilter/sok-filter';
import RadioFilterForm from '../../components/radiofilterform/radio-filter-form';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { useAppStore } from '../../../store/app-store';
import { lagVeilederSammensattNavn } from '../../../util/selectors';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { Oppfolging, OppfolgingStatus, tildelTilVeileder } from '../../../api/veilarboppfolging';
import {fetchInnloggetVeileder, VeilederData} from '../../../api/veilarbveileder';
import './tildel-veileder.less';

function TildelVeileder() {
    const { brukerFnr } = useAppStore();
    const { showTildelVeilederKvitteringModal, showTildelVeilederFeiletModal, hideModal } = useModalStore();
    const { veilederePaEnhet, oppfolging, setOppfolging, setOppfolgingsstatus } = useDataStore();
    const [selectedVeilederId, setSelectedVeilederId] = useState('');
    const innloggetVeileder = fetchInnloggetVeileder();
    const fraVeileder = oppfolging?.veilederId;
    
    const sorterVeiledere = (input: VeilederData[]): VeilederData[] => {
        input.sort((a, b) => (a.etternavn && b.etternavn ? a.etternavn.localeCompare(b.etternavn) : 1));
        if (innloggetVeileder) {
            input = input.filter(item => item.ident !== innloggetVeileder.ident);
            input.unshift(innloggetVeileder);
        }
        return input;
    };

    const sorterteVeiledere = useMemo(() => {
        const veiledere = veilederePaEnhet?.veilederListe || [];
        return sorterVeiledere(veiledere);
    });

    const handleSubmitTildelVeileder = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        document
            .querySelectorAll('input[type=radio]:checked')
            .forEach(elem => ((elem as HTMLInputElement).checked = false));

        tildelTilVeileder([
            {
                fraVeilederId: fraVeileder,
                tilVeilederId: selectedVeilederId,
                brukerFnr
            }
        ])
            .then(res => {
                if (res.data.feilendeTilordninger.length > 0) {
                    throw new Error('Tildeling feilet');
                }

                // Oppdater med ny veileder
                setOppfolging(
                    prevOppfolging => ({ ...(prevOppfolging || {}), veilederId: selectedVeilederId } as Oppfolging)
                );
                setOppfolgingsstatus(
                    prevOppfolgingStatus =>
                        ({
                            ...(prevOppfolgingStatus || {}),
                            veilederId: selectedVeilederId
                        } as OppfolgingStatus)
                );

                const veilederNavn =
                    sorterteVeiledere
                        .filter(v => v.ident === selectedVeilederId)
                        .map(v => lagVeilederSammensattNavn(v))[0] || 'Ukjent veileder';

                showTildelVeilederKvitteringModal({ tildeltVeilederNavn: veilederNavn });
            })
            .catch(showTildelVeilederFeiletModal);
    };

    return (
        <VeilederVerktoyModal tittel="Tildel veileder">
            <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmitTildelVeileder(event)}
                className="tildel-veileder__form"
            >
                <SokFilter data={sorterteVeiledere} label="" placeholder="Søk navn eller NAV-ident">
                    {data => (
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
