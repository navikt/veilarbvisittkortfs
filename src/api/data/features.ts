export const PILOT_TOGGLE = 'pto.vedtaksstotte.pilot';
export const VEDTAKSSTTOTTE_PRELANSERING_TOGGLE = 'veilarbvedtaksstottefs.prelansering';

export const ALL_TOGGLES = [PILOT_TOGGLE, VEDTAKSSTTOTTE_PRELANSERING_TOGGLE];

export interface Features {
    [PILOT_TOGGLE]: boolean;
    [VEDTAKSSTTOTTE_PRELANSERING_TOGGLE]: boolean;
}
