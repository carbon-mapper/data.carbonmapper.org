/* eslint-disable  @typescript-eslint/no-explicit-any */
type Callback = (...args: any[]) => void;

export function throttle(cb: Callback, delay = 100): Callback {
    let shouldWait = false;
    let waitingArgs: any[] | null = null;
    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false;
        } else {
            cb(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    };

    return (...args: any[]): void => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }

        cb(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, delay);
    };
}
