import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import SokFilter from '../../components/sokfilter/sok-filter';
import RadioFilterForm from '../../components/radiofilterform/radio-filter-form';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { useAppStore } from '../../../store/app-store';
import { lagVeilederSammensattNavn } from '../../../util/selectors';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { Oppfolging, OppfolgingStatus, tildelTilVeileder, useOppfolgingsstatus } from '../../../api/veilarboppfolging';
import { VeilederData } from '../../../api/veilarbveileder';
import './tildel-veileder.less';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';
import { useFargekategori, useHuskelapp } from '../../../api/veilarbportefolje';

function TildelVeileder() {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const { data: huskelapp } = useHuskelapp(brukerFnr, visVeilederVerktoy);
    const { data: fargekategori } = useFargekategori(brukerFnr, visVeilederVerktoy);
    const { showTildelVeilederKvitteringModal, showTildelVeilederFeiletModal, hideModal } = useModalStore();
    const [visAdvarselOmSletting, setVisAdvarselOmSletting] = useState<boolean>(false);
    const { data: oppfolgingstatus, mutate: setOppfolgingsstatus } = useOppfolgingsstatus(brukerFnr);
    const { veilederePaEnhet, oppfolging, setOppfolging, innloggetVeileder } = useDataStore();
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

    const handleSubmitTildelVeileder = async () => {
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
                    prevOppfolging => ({ ...(prevOppfolging || {}), veilederId: selectedVeilederId }) as Oppfolging
                );
                setOppfolgingsstatus(
                    prevOppfolgingStatus =>
                        ({
                            ...(prevOppfolgingStatus || {}),
                            veilederId: selectedVeilederId
                        }) as OppfolgingStatus
                );

                const veilederNavn =
                    sorterteVeiledere
                        .filter(v => v.ident === selectedVeilederId)
                        .map(v => lagVeilederSammensattNavn(v))[0] || 'Ukjent veileder';

                showTildelVeilederKvitteringModal({ tildeltVeilederNavn: veilederNavn });
            })
            .catch(showTildelVeilederFeiletModal);
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        document
            .querySelectorAll('input[type=radio]:checked')
            .forEach(elem => ((elem as HTMLInputElement).checked = false));

        const harHuskelappSomVilBliSlettet =
            huskelapp && huskelapp?.enhetId !== oppfolgingstatus?.oppfolgingsenhet?.enhetId;
        const harFargekategoriSomVilBliSlettet =
            fargekategori && fargekategori?.enhetId !== oppfolgingstatus?.oppfolgingsenhet?.enhetId;

        const brukerHarHuskelappEllerFargekategoriSomVilBliSlettet =
            harHuskelappSomVilBliSlettet || harFargekategoriSomVilBliSlettet;

        if (brukerHarHuskelappEllerFargekategoriSomVilBliSlettet) {
            setVisAdvarselOmSletting(true);
        } else {
            handleSubmitTildelVeileder();
        }
    };

    return (
        <>
            <Modal
                open={visAdvarselOmSletting}
                onClose={() => setVisAdvarselOmSletting(false)}
                closeOnBackdropClick={true}
                aria-labelledby="tildel-veileder-slettevarsel__overskrift"
            >
                <Modal.Header>
                    <Heading id="tildel-veileder-slettevarsel__overskrift" size="medium" level="2">
                        Huskelapp og/eller kategori blir slettet
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <BodyShort size="medium">
                        Huskelapp og/eller kategori for bruker med fødselsnummer {brukerFnr} ble opprettet på en annen
                        enhet, og vil bli slettet ved tildeling av ny veileder.
                    </BodyShort>
                    <br />
                    <BodyShort size="medium" weight="semibold">
                        Ønsker du likevel å tildele veilederen?
                    </BodyShort>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        size="small"
                        onClick={() => {
                            handleSubmitTildelVeileder().then(() => setVisAdvarselOmSletting(false));
                        }}
                    >
                        Ja, tildel veilederen
                    </Button>
                    <Button
                        variant="tertiary"
                        size="small"
                        onClick={() => {
                            setVisAdvarselOmSletting(false);
                        }}
                    >
                        Avbryt tildeling
                    </Button>
                </Modal.Footer>
            </Modal>

            <VeilederVerktoyModal tittel="Tildel veileder">
                <form
                    onSubmit={(event: FormEvent<HTMLFormElement>) => onSubmit(event)}
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
                                changeSelected={(e: ChangeEvent<HTMLInputElement>) =>
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
        </>
    );
}

export default TildelVeileder;
