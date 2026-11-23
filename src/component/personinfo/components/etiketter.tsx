import './etiketter.less';
import { useVisittkortEtiketter, VisittkortEtiketter } from '../../../api/veilarbperson';
import { HStack, InlineMessage, Loader, Tag, TagProps } from '@navikt/ds-react';
import { mapUtmeldingskandidatTag } from '../../../util/utmeldingskandidat-tag';

interface Etikettprops extends Omit<TagProps, 'variant'> {
    visible: boolean | undefined;
}

const alvorligeEtiketter: readonly (keyof VisittkortEtiketter)[] = [
    'dod',
    'adressebeskyttelse',
    'sikkerhetstiltak',
    'skjerming',
    'vergemaalOppfolging',
    'fullmaktOppfolging',
    'tegnspraaktolk',
    'talespraaktolk',
    'kvp',
    'manuellOppfolging',
    'reservertKrr',
    'utdatertIKrr',
    'ikkeRegistrertKrr'
];

const Advarsel = ({ visible, title, children }: Etikettprops) =>
    visible && (
        <Tag variant="error" size="small" title={title}>
            {children}
        </Tag>
    );

const Info = ({ visible, title, children }: Etikettprops) =>
    visible && (
        <Tag variant="info" size="small" title={title}>
            {children}
        </Tag>
    );

const Fokus = ({ visible, title, children }: Etikettprops) =>
    visible && (
        <Tag variant="warning" size="small" title={title}>
            {children}
        </Tag>
    );

const BaseDod = ({ visible, title, children }: Etikettprops) =>
    visible && (
        <Tag variant="neutral" size="small" title={title}>
            {children}
        </Tag>
    );

function Etiketter({ brukerFnr }: { brukerFnr: string }) {
    const { data, error, isLoading } = useVisittkortEtiketter(brukerFnr);

    if (error) {
        return (
            <InlineMessage className="etikett-status" status="error" size="small" role="alert">
                Kunne ikke laste etiketter. Prøv igjen senere.
            </InlineMessage>
        );
    }

    if (isLoading) {
        return <Loader className="etikett-status" size="small" title="Laster etiketter" />;
    }

    if (!data) return null;

    const { etiketter, feilendeEtiketter } = data;
    const harAlvorligeFeil = feilendeEtiketter.some(felt => alvorligeEtiketter.includes(felt));

    return (
        <HStack className="etikett-container" align="center" gap="space-2 space-4" wrap>
            <BaseDod visible={!!etiketter.dod}>Død</BaseDod>
            <Advarsel visible={!!etiketter.adressebeskyttelse}>
                {etiketter.adressebeskyttelse?.replace('KODE_', 'Kode ')}
            </Advarsel>
            <Fokus visible={!!etiketter.utmeldingskandidat}>
                {mapUtmeldingskandidatTag(etiketter.utmeldingskandidat)}
            </Fokus>
            <Advarsel
                visible={!!etiketter.sikkerhetstiltak}
                title={etiketter.sikkerhetstiltak?.beskrivelse ?? undefined}
            >
                {etiketter.sikkerhetstiltak?.beskrivelse ?? 'Sikkerhetstiltak'}
            </Advarsel>
            <Advarsel visible={!!etiketter.skjerming}>Skjermet</Advarsel>
            <Fokus visible={!!etiketter.vergemaalOppfolging}>Vergemål</Fokus>
            <Fokus visible={!!etiketter.fullmaktOppfolging}>Fullmakt Oppfølging</Fokus>
            <Fokus visible={!!etiketter.tegnspraaktolk}>Tegnspråktolk</Fokus>
            <Fokus visible={!!etiketter.talespraaktolk}>Språktolk</Fokus>
            <Fokus visible={!!etiketter.kvp}>KVP</Fokus>
            <Fokus
                visible={!!etiketter.manuellOppfolging}
                title="Brukeren er vurdert til å ikke kunne benytte seg av aktivitetsplanen og dialogen. Du kan endre til digital oppfølging i Veilederverktøy dersom bruker ikke er reservert i KRR."
            >
                Manuell oppfølging
            </Fokus>
            <Fokus
                visible={!!etiketter.reservertKrr}
                title="Brukeren har reservert seg mot digital kommunikasjon i Kontakt- og reservasjonsregisteret, og kan derfor ikke benytte seg av aktivitetsplanen og dialogen."
            >
                Reservert KRR
            </Fokus>
            <Fokus visible={!!etiketter.utdatertIKrr}>Utdatert i KRR</Fokus>
            <Fokus visible={!!etiketter.ikkeUnderOppfolging}>Ikke under oppfølging</Fokus>
            <Fokus visible={!!etiketter.varsel}>Varsel</Fokus>
            <Fokus
                visible={!!etiketter.ikkeRegistrertKrr}
                title="Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret og kan ikke varsles. Du kan derfor ikke samhandle digitalt med brukeren. "
            >
                Ikke registrert KRR
            </Fokus>
            <Info visible={!!etiketter.trengerOppfolgingsvedtak}>Trenger oppfølgingsvedtak § 14 a</Info>
            <Info visible={!!etiketter.sykmeldt}>Sykmeldt</Info>
            <Info visible={!!etiketter.iArbeidssokerregisteret}>I Arbeidssøkerregisteret</Info>
            <Info visible={!!etiketter.antattGodeMuligheter}>Antatt gode muligheter</Info>
            <Info visible={!!etiketter.antattBehovForVeiledning}>Antatt behov for veiledning</Info>
            <Info visible={!!etiketter.oppgittHindringer}>Oppgitt hindringer</Info>
            {feilendeEtiketter.length > 0 && (
                <InlineMessage
                    className="etikett-feil"
                    status={harAlvorligeFeil ? 'error' : 'warning'}
                    size="small"
                    role="alert"
                >
                    {harAlvorligeFeil
                        ? 'Kunne ikke laste alle viktige etiketter. Informasjon om beskyttelse, sikkerhet eller dødsfall kan mangle.'
                        : 'Kunne ikke laste alle etiketter. Noe informasjon kan mangle.'}
                </InlineMessage>
            )}
        </HStack>
    );
}

export default Etiketter;
