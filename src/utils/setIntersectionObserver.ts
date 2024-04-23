export function setIntersectionObserver(
    callback: (isIntersecting: boolean) => void,
    target: HTMLElement,
    options?: IntersectionObserverInit
) {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => callback(entry.isIntersecting));
    };

    const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: '0%',
        threshold: 0.1,
        ...options
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    observer.observe(target);
}
