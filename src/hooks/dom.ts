import * as React from 'react';
import { useEffect } from 'react';

export const useClickOutside = (
    refs: React.MutableRefObject<HTMLDivElement | null>[],
    handleClickOutSide: () => void
) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (refs.filter((ref) => !ref.current).length > 0) {
                return;
            }
            if (
                refs
                    .map((ref) => !ref.current?.contains(event.target as any))
                    .every((result) => result)
            ) {
                handleClickOutSide();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutSide, refs]);
};
