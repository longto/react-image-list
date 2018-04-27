export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!omitKeys.includes(key)) {
        res[key] = target[key];
      }
      return res;
    },
    {} as Omit<T, K>
  );
}

export function random(min=0, max=100){
  return (min + Math.random() * (max - min)) | 0;
}
