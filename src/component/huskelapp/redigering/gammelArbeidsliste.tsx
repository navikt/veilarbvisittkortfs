import { BodyLong, BodyShort, Detail, Heading, List } from '@navikt/ds-react';
import { Arbeidsliste } from '../../../api/veilarbportefolje';
import { toSimpleDateStr } from '../../../util/date-utils';
import './huskelapp-redigering.less';

interface Props {
    arbeidsliste: Arbeidsliste | undefined;
}

export const GammelArbeidsliste = ({ arbeidsliste }: Props) => {
    return (
        <div className="arbeidsliste-innhold">
            <Heading level="2" size="small">
                Gammel arbeidsliste
            </Heading>
            <List size="small">
                <List.Item>Kopier det du vil ha med fra gammel arbeidsliste, og legg i ny huskelapp.</List.Item>
                <List.Item>
                    Gammel arbeidsliste slettes automatisk når du lagrer ny huskelapp, fargekategori beholdes.
                </List.Item>
            </List>
            <div className="arbeidsliste-innhold-tekst">
                <Heading level="3" size="xsmall">
                    {arbeidsliste?.overskrift}
                </Heading>
                <BodyLong size="small" spacing>
                    {arbeidsliste?.kommentar}
                </BodyLong>
                <BodyShort size="small" spacing className="arbeidsliste-innhold-frist">
                    {arbeidsliste?.frist && (
                        <i>Arbeidslistefrist: {toSimpleDateStr(arbeidsliste?.frist ?? 'Ingen frist satt')}</i>
                    )}
                </BodyShort>
            </div>
            <Detail>
                <i>
                    {`Oppdatert ${
                        arbeidsliste?.endringstidspunkt ? toSimpleDateStr(arbeidsliste.endringstidspunkt) : 'ukjent'
                    }`}
                    {arbeidsliste?.sistEndretAv?.veilederId && ` av ${arbeidsliste.sistEndretAv.veilederId}`}
                </i>
            </Detail>
        </div>
    );
};
