// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sumObjectsByKey(...objs: any[]) {
    return objs.reduce((a, b) => {
      for (const k in b) {
        if (b.hasOwnProperty(k))
          a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
}