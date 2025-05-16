import FormikModal from '../../components/formik/formik-modal';
import { Alert, BodyShort, ErrorMessage, Heading, Modal, Skeleton } from '@navikt/ds-react';
import { Form as FormikForm } from 'formik';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { selectSammensattNavn } from '../../../util/selectors';
import ByttOppfolgingskontorForm from './bytt-oppfolgingskontor-form';
import { ArbeidsOppfolgingKontorDTO, hentAlleKontor, settKontor } from '../../../api/ao-oppfolgingskontor';
import './bytt-oppfolgingskontor.css';
import { ByttOppfolgingskontorKvittering, KontorSkiftetKvittering } from './bytt-oppfolgingskontor-kvittering';
import { useState } from 'react';
import useSWR from 'swr';
import { AxiosError } from 'axios';

function ByttOppfolgingskontorModal() {
    const [kvittering, setKvittering] = useState<KontorSkiftetKvittering | undefined>(undefined);
    const { brukerFnr, enhetId } = useAppStore();
    const { personalia } = useDataStore();
    const { hideModal } = useModalStore();
    const [settKontorError, setSettKontorError] = useState<string | undefined>();

    const {
        data: alleKontorData,
        error: hentAlleKontorError,
        isLoading: hentAlleKontorLoading
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } = useSWR(['/kontorer', brukerFnr], ([_, fnr]) => hentAlleKontor(fnr));

    const navn = selectSammensattNavn(personalia);

    if (!enhetId) {
        return null;
    }

    const arbeidsOppfolgingKontorInitialValues: ArbeidsOppfolgingKontorDTO = {
        fnr: brukerFnr,
        kontorId: enhetId
    };

    const alleKontor = alleKontorData?.data?.data?.alleKontor || [];
    const kontorTilhorighet = alleKontorData?.data?.data?.kontorTilhorighet || null;

    async function lagreOppfolgingskontor(formdata: ArbeidsOppfolgingKontorDTO) {
        try {
            setSettKontorError(undefined);
            await settKontor(formdata);
            setKvittering({
                fraKontor: { kontorId: enhetId || '', navn: 'Ditt nåværende kontor' },
                tilKontor: { kontorId: formdata.kontorId, navn: 'Ditt nye kontor' }
            });
        } catch (error) {
            const axisosError = error as AxiosError<string>;
            setSettKontorError(axisosError.response?.data || axisosError.message);
        }
    }

    if (kvittering) {
        return (
            <Modal
                className="visittkortfs-modal"
                open
                onClose={hideModal}
                closeOnBackdropClick={true}
                header={{
                    heading: 'Bytt oppfølgingskontor',
                    closeButton: true
                }}
            >
                <Modal.Body>
                    <ByttOppfolgingskontorKvittering kvittering={kvittering} />
                </Modal.Body>
            </Modal>
        );
    }

    if (hentAlleKontorError) {
        return (
            <Modal
                className="visittkortfs-modal"
                open
                onClose={hideModal}
                closeOnBackdropClick={true}
                header={{
                    heading: 'Bytt oppfølgingskontor',
                    closeButton: true
                }}
            >
                <Modal.Body>
                    <ErrorMessage>Kunne ikke hente oppfølgingskontor. Vennligst prøv igjen senere.</ErrorMessage>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <FormikModal
            initialValues={arbeidsOppfolgingKontorInitialValues}
            handleSubmit={lagreOppfolgingskontor}
            tittel="Bytt oppfølgingskontor"
            className="bytt-oppfolgingskontor"
            render={() => (
                <div className="bytt-oppfolgingskontor-modal space-y-4">
                    <div className="space-y-2 p-4 rounded-sm border-border-default bg-surface-subtle">
                        <div className="mb-2">
                            <Heading size={'small'}>Fakta om bruker</Heading>
                        </div>
                        <dl>
                            <div className="flex space-x-2">
                                <BodyShort weight="semibold" as={'dt'}>
                                    Navn:
                                </BodyShort>
                                <BodyShort as={'dd'}>{navn}</BodyShort>
                            </div>
                            <div className="flex space-x-2">
                                <BodyShort as="dt" weight="semibold">
                                    Folkeregistrert adresse:
                                </BodyShort>
                                <BodyShort as={'dd'}>
                                    Fyrstikkalleen 1, Fyrstikkalleen 1, , Fyrstikkalleen 1,{' '}
                                </BodyShort>
                            </div>
                            <div className="flex space-x-2">
                                <BodyShort as={'dt'} weight="semibold">
                                    Nåværende oppfølgingskontor:
                                </BodyShort>
                                {hentAlleKontorLoading ? (
                                    <Skeleton width={100} />
                                ) : (
                                    <BodyShort
                                        as={'dd'}
                                    >{`${kontorTilhorighet?.kontorId} - ${kontorTilhorighet?.kontorNavn}`}</BodyShort>
                                )}
                            </div>
                        </dl>
                    </div>
                    <FormikForm>
                        <ByttOppfolgingskontorForm
                            isKontorFetchLoading={hentAlleKontorLoading}
                            alleKontor={alleKontor}
                            tilbake={() => hideModal()}
                        />
                        {settKontorError && (
                            <Alert className="mt-4" variant="error">
                                <span className="flex">
                                    Klarte ikke tilordne nytt kontor til bruker. Vennligst prøv igjen senere
                                </span>
                                <span>{settKontorError}</span>
                            </Alert>
                        )}
                    </FormikForm>
                </div>
            )}
        />
    );
}

export default ByttOppfolgingskontorModal;
