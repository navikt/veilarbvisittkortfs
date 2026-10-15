import { DatePicker, Modal, Tag, VStack, useDatepicker, HelpText, Button, Detail, Link } from '@navikt/ds-react';
import { useModalStore } from '../../../store/modal-store';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useForlengOppfolging, useOppfolging } from '../../../api/veilarboppfolging';
import { OppfolgingForlengetTilKvitering, ForlengOppfolgingKvittering } from './forleng-oppfolging-kvittering';
import { mapUtmeldingskandidatTag } from '../../../util/utmeldingskandidat-tag';
import { useState } from 'react';
import { erITestMiljo } from '../../../util/utils';
import { OppfolgingForlengelseFeilet } from './forleng-oppfolging-feilet';
import { harAktivForlengelse } from './utils';

dayjs.extend(customParseFormat);

function ForlengOppfolgingModal({ brukerFnr }: { brukerFnr: string }) {
    const imorgen = dayjs().add(1, 'day').toDate();
    const maksDato = dayjs().add(6, 'month').startOf('day').toDate();

    const { hideModal } = useModalStore();
    const { oppfolging, mutate } = useOppfolging(brukerFnr);
    const { forlengOppfolging, isLoading, error } = useForlengOppfolging();

    const [forlengTilDato, setForlengTilDato] = useState<Date | undefined>(
        harAktivForlengelse(oppfolging)
            ? dayjs(oppfolging?.utmeldingskandidat?.aktivForlengelse?.forlengetTil).toDate()
            : undefined
    );
    const [datoInput, setDatoInput] = useState<string>(() =>
        forlengTilDato ? dayjs(forlengTilDato).format('DD.MM.YYYY') : ''
    );
    const [kvittering, setKvittering] = useState<OppfolgingForlengetTilKvitering | undefined>(undefined);
    const [datoFeilmelding, setDatoFeilmelding] = useState<string | undefined>(undefined);
    const [valideringsfeil, setValideringsfeil] = useState<boolean>(false);

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: forlengTilDato,
        onDateChange: date => {
            setForlengTilDato(date);
            if (date) setDatoFeilmelding(undefined);
        },
        fromDate: imorgen,
        toDate: maksDato
    });

    async function handleLagreForlengelse() {
        setValideringsfeil(false);

        if (!brukerFnr) {
            setValideringsfeil(true);
            return;
        }
        if (oppfolging?.utmeldingskandidat.tag === null && !harAktivForlengelse(oppfolging)) {
            setValideringsfeil(true);
            return;
        }

        const valgtDato = forlengTilDato ? dayjs(forlengTilDato) : dayjs(datoInput, 'DD.MM.YYYY');

        if (!valgtDato.isValid()) {
            setDatoFeilmelding('Velg en dato for forlengelse av oppfølging.');
            return;
        }

        if (valgtDato.isBefore(imorgen, 'day') || valgtDato.isAfter(maksDato)) {
            setDatoFeilmelding('Velg en fremtidig dato inntill 6 måneder.');
            return;
        }

        const formatertDato = valgtDato.format('YYYY-MM-DD');

        await forlengOppfolging({ fnr: brukerFnr, forlengetTil: formatertDato }, { throwOnError: false });
        await mutate();
        setKvittering({ forlengetTil: dayjs(formatertDato).toDate() });
    }

    function getModalContent() {
        if (error || valideringsfeil) {
            return <OppfolgingForlengelseFeilet tilbake={() => hideModal()} />;
        } else if (kvittering) {
            return <ForlengOppfolgingKvittering kvittering={kvittering} tilbake={() => hideModal()} />;
        } else {
            const utmeldingskandidatTag = mapUtmeldingskandidatTag(oppfolging?.utmeldingskandidat.tag);

            return (
                <>
                    <Modal.Body>
                        <VStack gap="space-16" align="start" className="pb-8">
                            {utmeldingskandidatTag && (
                                <Tag variant="warning" size="small">
                                    {utmeldingskandidatTag}
                                </Tag>
                            )}
                            <DatePicker {...datepickerProps}>
                                <DatePicker.Input
                                    {...inputProps}
                                    id="forleng-til-dato"
                                    label={
                                        <span className="flex items-center gap-1">
                                            Velg når personen igjen skal bli kandidat for avslutning
                                            <HelpText title="forklaring">
                                                På valgt dato legges personen igjen i filteret «Kandidater for
                                                avslutning (fase 1)». Du kan velge en dato inntil 6 måneder frem i tid.
                                            </HelpText>
                                        </span>
                                    }

                                    onChange={event => {
                                        const dato = event.target.value;
                                        inputProps.onChange?.(event);
                                        setDatoInput(dato);

                                        if (!dato) {
                                            setForlengTilDato(undefined);
                                            return;
                                        }

                                        const parsedDato = dayjs(dato, 'DD.MM.YYYY', true);
                                        setForlengTilDato(parsedDato.isValid() ? parsedDato.toDate() : undefined);
                                    }}
                                    error={datoFeilmelding}
                                />
                            </DatePicker>
                        </VStack>
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
                        <Button
                            variant="primary"
                            size="small"
                            type="submit"
                            onClick={handleLagreForlengelse}
                            loading={isLoading}
                            aria-label="Bekreft forleng oppfølging"
                        >
                            Bekreft
                        </Button>
                        <Button variant="secondary" size="small" onClick={hideModal} disabled={isLoading}>
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </>
            );
        }
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
            {getModalContent()}
        </Modal>
    );
}

export default ForlengOppfolgingModal;
