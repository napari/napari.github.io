type Callback = (err: Error, filePath: string) => void;

// eslint-disable-next-line import/prefer-default-export
export function img(
  data: string,
  destPath: string,
  name: string,
  callback: Callback,
): void;
