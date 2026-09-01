import { DatePicker, Modal, Tag, VStack, useDatepicker, HelpText, Button, Detail, Link } from '@navikt/ds-react';
import { useModalStore } from '../../../store/modal-store';
import './forleng-oppfolging.less';
import dayjs from 'dayjs';
import { useOppfolging } from '../../../api/veilarboppfolging';
import { OppfolgingForlengetTilKvitering, ForlengOppfolgingKvittering } from './forleng-oppfolging-kvittering';
import { mapUtmeldingskandidatTag } from '../../../util/utmeldingskandidat-tag';
import { useState } from 'react';
import { erITestMiljo } from '../../../util/utils';

function ForlengOppfolgingModal({ brukerFnr }: { brukerFnr: string }) {
    const [forlengTilDato, setForlengTilDato] = useState<Date | undefined>(dayjs().add(14, 'day').toDate());
    const [kvittering, setKvittering] = useState<OppfolgingForlengetTilKvitering | undefined>(undefined);
    // const [settForlengError, setSettForlengError] = useState<string | undefined>(undefined);

    const { hideModal } = useModalStore();
    const { oppfolging } = useOppfolging(brukerFnr);
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: forlengTilDato,
        onDateChange: setForlengTilDato,
        fromDate: new Date()
    });

    async function lagreForlengelse() {
        setKvittering({ forlengetTil: forlengTilDato! });
    }

    return (
        <Modal
            open
            onClose={hideModal}
            header={{
                heading: 'Forleng arbeidsrettet oppfølging'
            }}
            className="forleng-oppfolging-modal"
        >
            <Modal.Body className="forleng-oppfolging-modal__body">
                if (kvittering) {<ForlengOppfolgingKvittering kvittering={kvittering} />}
                else{' '}
                {
                    <VStack gap="space-16" align="start" className="pb-8">
                        <Tag variant="warning" size="small">
                            {mapUtmeldingskandidatTag(oppfolging?.utmeldingskandidatTag)}
                        </Tag>
                        <DatePicker {...datepickerProps}>
                            <DatePicker.Input
                                {...inputProps}
                                id="forleng-til-dato"
                                label={
                                    <span className="flex items-center gap-1">
                                        Velg når personen igjen skal bli kandidat for avslutning
                                        <HelpText title="forklaring">
                                            På valgt dato legges personen igjen i filteret «Kandidater for avslutning
                                            (fase 1)». Du kan velge en dato inntil 6 måneder frem i tid.
                                        </HelpText>
                                    </span>
                                }
                                required
                            />
                        </DatePicker>
                    </VStack>
                }
            </Modal.Body>
            <Modal.Footer>
                <Detail className="text-ax-text-neutral self-end ml-auto text-left flex-1">
                    Forlengelse registrerer <strong>ikke</strong> personen som arbeidssøker.{' '}
                    <Link
                        href={
                            erITestMiljo()
                                ? `https://arbeidssokerregistrering-for-veileder.ansatt.dev.nav.no`
                                : `https://arbeidssokerregistrering-for-veileder.intern.nav.no/`
                        }
                    >
                        Gå til arbeidssøkerregisteret
                    </Link>
                </Detail>
                <Button variant="primary" size="small" type="submit" onClick={lagreForlengelse}>
                    Bekreft
                </Button>
                <Button variant="secondary" size="small">
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ForlengOppfolgingModal;
