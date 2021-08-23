import fs from 'fs-extra';
import handlebars from 'handlebars';
import recursive from 'recursive-readdir';
import micromatch from 'micromatch';

interface IOption {
  /**
   * glob pattern for exclude files
   */
  exclude?: readonly string[] | string;
  /**
   * template file suffix
   */
  tplSuffix?: string;
}

// register handlebars helper
handlebars.registerHelper('if_eq', (a, b, opts) => {
  return a === b ? opts.fn(this) : opts.inverse(this);
});
handlebars.registerHelper('unless_eq', (a, b, opts) => {
  return a === b ? opts.inverse(this) : opts.fn(this);
});

const generator = async <TMeta>(
  meta: TMeta,
  rootDir: string,
  option: IOption = {
    tplSuffix: 'tpl',
  }
): Promise<void> => {
  const { tplSuffix, exclude } = option;
  const files = await recursive(rootDir);
  files.forEach(file => {
    const isInclude = tplSuffix ? micromatch.isMatch(file, `**/*.${tplSuffix}.*`) : true;
    const isExclude = exclude && micromatch.isMatch(file, exclude);
    if (file.endsWith('gitignore')) {
      fs.renameSync(file, file.replace('gitignore', '.gitignore'));
    } else if (file.endsWith('npmrc')) {
      fs.renameSync(file, file.replace('npmrc', '.npmrc'));
    }
    if (isExclude) {
      return;
    }
    if (isInclude) {
      const content = fs.readFileSync(file).toString();
      const result = handlebars.compile(content)(meta);

      fs.writeFileSync(file, result);
      fs.renameSync(file, file.replace('tpl.', ''));
    }
  });
};

export = generator;
