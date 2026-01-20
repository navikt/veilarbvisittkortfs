import { Alert, BodyShort, ErrorMessage, Modal } from '@navikt/ds-react';
import { useBrukerFnr, useEnhetId } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { selectSammensattNavn } from '../../../util/selectors';
import ByttOppfolgingskontorForm from './bytt-oppfolgingskontor-form';
import { hentAlleKontor } from '../../../api/ao-oppfolgingskontor';
import { ByttOppfolgingskontorKvittering, KontorSkiftetKvittering } from './bytt-oppfolgingskontor-kvittering';
import { useState } from 'react';
import useSWR from 'swr';
import KontorHistorikk from './KontorHistorikk';
import { BrukerFakta } from './BrukerFakta';

function ByttOppfolgingskontorModal() {
    const [kvittering, setKvittering] = useState<KontorSkiftetKvittering | undefined>(undefined);
    const enhetId = useEnhetId();
    const brukerFnr = useBrukerFnr();
    const { personalia } = useDataStore();
    const { hideModal } = useModalStore();
    const [settKontorError, setSettKontorError] = useState<string | undefined>();

    const {
        data: alleKontorData,
        error: hentAlleKontorError,
        isLoading: hentAlleKontorLoading
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } = useSWR(brukerFnr ? `/kontorer/${brukerFnr}` : null, () => hentAlleKontor(brukerFnr));

    const navn = selectSammensattNavn(personalia);

    if (!enhetId) {
        return null;
    }

    const alleKontor = alleKontorData?.data?.data?.alleKontor || [];
    const kontorTilhorighet = alleKontorData?.data?.data?.kontorTilhorigheter || null;
    const kontorHistorikk = alleKontorData?.data?.data?.kontorHistorikk || [];

    const getModalBody = () => {
        if (kvittering) {
            return <ByttOppfolgingskontorKvittering kvittering={kvittering} />;
        } else if (hentAlleKontorError) {
            return <ErrorMessage>Kunne ikke hente oppfølgingskontor. Vennligst prøv igjen senere.</ErrorMessage>;
        } else {
            return (
                <div className="bytt-oppfolgingskontor-modal space-y-6">
                    <div>
                        Her kan du overføre denne personen / brukeren til et annet kontor for arbeidsrettet oppfølging.
                    </div>
                    <Alert inline variant="info">
                        Husk å oppdatere aktivitetsplan og § 14 a vedtaket før du overfører brukeren til et annet
                        kontor.
                    </Alert>
                    <BrukerFakta
                        kontorTilhorighet={kontorTilhorighet}
                        hentAlleKontorLoading={hentAlleKontorLoading}
                        navn={navn}
                    />
                    <KontorHistorikk kontorHistorikk={kontorHistorikk} />
                    <div className="mb-2">
                        <div className="mb-1">
                            <BodyShort weight="semibold">Nytt kontor for arbeidsrettet oppfølging</BodyShort>
                        </div>
                        <BodyShort textColor="subtle">
                            Velg i listen eller skriv inn navn på kontoret du ønsker å bytte til
                        </BodyShort>
                    </div>
                    <ByttOppfolgingskontorForm
                        isKontorFetchLoading={hentAlleKontorLoading}
                        alleKontor={alleKontor}
                        tilbake={() => hideModal()}
                        setKvittering={setKvittering}
                        setSettKontorError={setSettKontorError}
                    />
                    {settKontorError && (
                        <Alert className="mt-4" variant="error">
                            <span className="flex">
                                Klarte ikke tilordne nytt kontor til bruker. Vennligst prøv igjen senere
                            </span>
                            <span>{settKontorError}</span>
                        </Alert>
                    )}
                </div>
            );
        }
    };

    return (
        <Modal
            onClose={hideModal}
            open
            header={{
                heading: 'Bytt oppfølgingskontor'
            }}
            className="bytt-oppfolgingskontor"
        >
            <Modal.Body>{getModalBody()}</Modal.Body>
        </Modal>
    );
}

export default ByttOppfolgingskontorModal;
