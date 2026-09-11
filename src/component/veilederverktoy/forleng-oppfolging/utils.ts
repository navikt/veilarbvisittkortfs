import { MedUtmeldingskandidat, Oppfolging } from '../../../api/veilarboppfolging';
import { OrNothing } from '../../../util/type/utility-types';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

export function harAktivForlengelse(oppfolging: OrNothing<Oppfolging & MedUtmeldingskandidat>): boolean {
    if (!oppfolging) return false;
    if (oppfolging.utmeldingskandidat.aktivForlengelse === null) return false;

    const today = dayjs().add(0, 'day');
    const aktivForlengelse = dayjs(oppfolging.utmeldingskandidat?.aktivForlengelse?.forlengetTil).isSameOrAfter(today);

    return oppfolging.utmeldingskandidat?.tag === null && aktivForlengelse;
}

export function erUtmeldingsKandidat(oppfolging: OrNothing<Oppfolging & MedUtmeldingskandidat>): boolean {
    if (!oppfolging) return false;
    if (oppfolging.utmeldingskandidat.aktivForlengelse !== null) return false;

    return oppfolging.utmeldingskandidat.tag !== null;
}
