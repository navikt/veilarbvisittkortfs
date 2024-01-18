import React, { useMemo, useState } from 'react';
import SokFilter from '../../components/sokfilter/sok-filter';
import RadioFilterForm from '../../components/radiofilterform/radio-filter-form';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { useAppStore } from '../../../store/app-store';
import { lagVeilederSammensattNavn } from '../../../util/selectors';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { Oppfolging, OppfolgingStatus, tildelTilVeileder } from '../../../api/veilarboppfolging';
import { VeilederData } from '../../../api/veilarbveileder';
import './tildel-veileder.less';
import { Button } from '@navikt/ds-react';

function TildelVeileder() {
    const { brukerFnr } = useAppStore();
    const { showTildelVeilederKvitteringModal, showTildelVeilederFeiletModal, hideModal } = useModalStore();
    const { veilederePaEnhet, oppfolging, setOppfolging, setOppfolgingsstatus, innloggetVeileder } = useDataStore();
    const [selectedVeilederId, setSelectedVeilederId] = useState('');
    const fraVeileder = oppfolging?.veilederId;

    const sorterteVeiledere = useMemo(() => {
        const veiledere = veilederePaEnhet?.veilederListe || [];
        return veiledere.sort((a, b) => {
            if (a.ident === b.ident) return 0;
            if (a.ident === innloggetVeileder?.ident) return -1;
            if (b.ident === innloggetVeileder?.ident) return 1;
            return a.etternavn.localeCompare(b.etternavn);
        });
    }, [veilederePaEnhet?.veilederListe, innloggetVeileder]);

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
                    <Button
                        variant="primary"
                        size="small"
                        className="bekreft-btn"
                        type="submit"
                        disabled={!selectedVeilederId}
                    >
                        Velg
                    </Button>
                    <Button variant="secondary" size="small" type="button" onClick={hideModal}>
                        Lukk
                    </Button>
                </div>
            </form>
        </VeilederVerktoyModal>
    );
}

export default TildelVeileder;
