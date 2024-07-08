import { atomEffect } from "jotai-effect";
import { useAtomValue } from "jotai/react";
import { useMemoOne as useStableMemo } from "use-memo-one";

type EffectFn = Parameters<typeof atomEffect>[0];

export function useAtomEffect(effectFn: EffectFn): void {
    useAtomValue(useStableMemo(() => atomEffect(effectFn), [effectFn]));
}