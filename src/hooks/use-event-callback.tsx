import { useCallback, useEffect, useRef } from 'react';

export function useEventCallback(callbackFn:(...args: any[]) => any | null) {
    const saveCallBack = useRef<any>(null);

    useEffect(()=> {
        saveCallBack.current = callbackFn;
    },[callbackFn]);

    return useCallback(function(...args: any[]) {
            return saveCallBack.current && saveCallBack.current(...args)
        },
        [saveCallBack],
    )
}