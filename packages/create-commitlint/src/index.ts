import fs from 'fs-extra';
import path from 'path';
import shell from 'shelljs';

const init = () => {
  const templateDir = path.resolve(__dirname, '../templates/conventional');
  const projectDir = `${process.cwd()}`;
  fs.copySync(templateDir, projectDir);
  console.log();
  const origin = JSON.parse(fs.readFileSync(`${projectDir}/package.json`, 'utf8'));

  const config = {
    ...origin,
    scripts: {
      ...origin.scripts,
      commit: 'git cz',
    },
    config: origin.config
      ? {
          ...origin.config,
          commitizen: {
            path: 'cz-customizable',
          },
        }
      : {
          commitizen: {
            path: 'cz-customizable',
          },
        },
    gitHooks: origin.gitHooks
      ? {
          ...origin.gitHooks,
          'commit-msg': 'commitlint -e -V',
        }
      : {
          'commit-msg': 'commitlint -e -V',
        },
  };

  fs.writeFileSync(`${projectDir}/package.json`, JSON.stringify(config));
  shell.exec(
    'yarn add commitizen cz-customizable @commitlint/cli commitlint-config-cz yorkie -D -W'
  );
};

export { init };
