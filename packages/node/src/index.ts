import fs from 'fs';

export const isDirEmpty = (dirname: string): Promise<any> => {
  return fs.promises.readdir(dirname).then(files => {
    return files.length === 0;
  });
};
