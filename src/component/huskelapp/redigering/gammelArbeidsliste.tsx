import { BodyLong, BodyShort, Heading, List } from '@navikt/ds-react';
import { Arbeidsliste } from '../../../api/veilarbportefolje';
import { toSimpleDateStr } from '../../../util/date-utils';
import './huskelapp-redigering.less';
import { SlettArbeidsliste } from './huskelapp-slett-arbeidsliste';

interface Props {
    arbeidsliste: Arbeidsliste | undefined;
}

export const GammelArbeidsliste = ({ arbeidsliste }: Props) => {
    return (
        <div>
            <div className="arbeidsliste-innhold">
                <Heading level="2" size="small">
                    Gammel arbeidsliste
                </Heading>
                <List size="small">
                    <List.Item>
                        Merk og kopiér det du vil ha med fra gammel arbeidsliste, og legg i ny huskelapp.
                    </List.Item>
                    <List.Item>
                        Gammel arbeidsliste slettes automatisk når du lagrer ny huskelapp, fargemerking beholdes.
                    </List.Item>
                </List>
                <BodyLong size="large" className="arbeidsliste-innhold-tekst">
                    <Heading level="3" size="xsmall">
                        {arbeidsliste?.overskrift}
                    </Heading>
                    <BodyShort size="small">
                        <i>Arbeidsliste frist: {toSimpleDateStr(arbeidsliste?.frist ?? 'Ingen frist satt')}</i>
                    </BodyShort>
                    <BodyLong size="small">{arbeidsliste?.kommentar}</BodyLong>
                    <BodyShort size="small">
                        <i>
                            {`Oppdatert ${
                                arbeidsliste?.endringstidspunkt
                                    ? toSimpleDateStr(arbeidsliste.endringstidspunkt)
                                    : 'ukjent'
                            }`}
                            {arbeidsliste?.sistEndretAv?.veilederId && ` av ${arbeidsliste.sistEndretAv.veilederId}`}
                        </i>
                    </BodyShort>
                </BodyLong>
            </div>
            <SlettArbeidsliste />
        </div>
    );
};
