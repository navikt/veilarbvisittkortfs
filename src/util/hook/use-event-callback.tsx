import { useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEventCallback(callbackFn: (...args: any[]) => any | null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveCallBack = useRef<any>(null);

    useEffect(() => {
        saveCallBack.current = callbackFn;
    }, [callbackFn]);

    return useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function (...args: any[]) {
            return saveCallBack.current && saveCallBack.current(...args);
        },
        [saveCallBack]
    );
}
