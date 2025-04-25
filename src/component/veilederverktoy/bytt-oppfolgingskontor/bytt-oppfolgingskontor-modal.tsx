import FormikModal from '../../components/formik/formik-modal';
import { BodyShort, Heading, Modal, Skeleton } from '@navikt/ds-react';
import { Form as FormikForm } from 'formik';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { selectSammensattNavn } from '../../../util/selectors';
import ByttOppfolgingskontorForm from './bytt-oppfolgingskontor-form';
import { ArbeidsOppfolgingKontorDTO, hentAlleKontor, settKontor } from '../../../api/ao-oppfolgingskontor';
import './bytt-oppfolgingskontor.css';
import { ByttOppfolgingskontorKvittering, KontorSkiftetKvittering } from './bytt-oppfolgingskontor-kvittering';
import { useEffect, useState } from 'react';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';

function ByttOppfolgingskontorModal() {
    const [kvittering, setKvittering] = useState<KontorSkiftetKvittering | undefined>(undefined);
    const { brukerFnr, enhetId } = useAppStore();
    const { personalia } = useDataStore();
    const { hideModal } = useModalStore();

    const alleKontorFetcher = useAxiosFetcher(hentAlleKontor);

    useEffect(() => {
        alleKontorFetcher.fetch();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    const navn = selectSammensattNavn(personalia);

    if (!enhetId) {
        return null;
    }

    const arbeidsOppfolgingKontorInitialValues: ArbeidsOppfolgingKontorDTO = {
        fnr: brukerFnr,
        kontorId: enhetId
    };

    const alleKontor = alleKontorFetcher?.data?.data.alleKontor || [];
    const nåværendeKontor = alleKontor.find(kontor => kontor.kontorId === enhetId);

    async function lagreOppfolgingskontor(formdata: ArbeidsOppfolgingKontorDTO) {
        await settKontor(formdata);
        setKvittering({
            fraKontor: { kontorId: enhetId || '', navn: 'Ditt nåværende kontor' },
            tilKontor: { kontorId: formdata.kontorId, navn: 'Ditt nye kontor' }
        });
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
                                {alleKontorFetcher.loading ? (
                                    <Skeleton width={100} />
                                ) : (
                                    <BodyShort
                                        as={'dd'}
                                    >{`${nåværendeKontor?.kontorId} - ${nåværendeKontor?.navn}`}</BodyShort>
                                )}
                            </div>
                        </dl>
                    </div>
                    <FormikForm>
                        <ByttOppfolgingskontorForm
                            isKontorFetchLoading={alleKontorFetcher.loading}
                            alleKontor={alleKontor}
                            tilbake={() => hideModal()}
                        />
                    </FormikForm>
                </div>
            )}
        />
    );
}

export default ByttOppfolgingskontorModal;
