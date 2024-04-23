/* eslint-disable  @typescript-eslint/no-explicit-any */
export function debounce<F extends (...args: any[]) => any>(callback: F, timeout = 300) {
    let timer = 0;

    return (...args: Parameters<F>) => {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            callback(...args);
        }, timeout);
    };
}

/**
 *
 * @param f callback
 * @param wait milliseconds
 * @param abortValue if has abortValue, promise will reject it if
 * @returns Promise
 */
export function debouncePromise<T extends (...args: any[]) => any>(
    fn: T,
    wait: number,
    abortValue: any = undefined
  ) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let cancel = () => { };
    // type Awaited<T> = T extends PromiseLike<infer U> ? U : T
    type ReturnT = Awaited<ReturnType<T>>;
    const wrapFunc = (...args: Parameters<T>): Promise<ReturnT> => {
      cancel();
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => resolve(fn(...args)), wait);
        cancel = () => {
          clearTimeout(timer);
          if (abortValue!==undefined) {
            reject(abortValue);
          }
        };
      });
    };
    return wrapFunc;
  }