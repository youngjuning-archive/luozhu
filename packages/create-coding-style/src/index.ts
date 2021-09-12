import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';

const { Select } = require('enquirer');

const init = async () => {
  const templateDir = path.resolve(__dirname, '../template');
  const projectDir = `${process.cwd()}`;
  fs.copySync(templateDir, projectDir);
  console.log();
  const prompt = new Select({
    name: 'eslintType',
    message: 'Pick a eslint type',
    choices: [
      'base',
      'typescript',
      'react',
      'react-typescript',
      'react-native',
      'react-native-typescript',
    ],
  });
  const eslintType = await prompt.run();
  const eslintConfig = `module.exports = {
    root: true,
    extends: ['@luozhu/eslint-config-${eslintType}'],
  };`;

  fs.writeFileSync(`${projectDir}/.eslintrc.js`, eslintConfig);
  execa.commandSync(
    `yarn add commitizen -D -W eslint prettier @luozhu/eslint-config-${eslintType} @luozhu/prettier-config lint-staged yorkie`,
    {
      shell: true,
      stdout: 'inherit',
      stderr: 'inherit',
    }
  );
  if (eslintType.indexOf('typescript') !== -1) {
    execa.commandSync(`yarn add commitizen -D -W typescript`, {
      shell: true,
      stdout: 'inherit',
      stderr: 'inherit',
    });
  }
};

export { init };
