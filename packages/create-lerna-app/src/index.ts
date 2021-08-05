import { program } from 'commander';
import chalk from 'chalk';
import tmp from 'tmp-promise';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import generator from '@luozhu/template-generator';

const init = (): void => {
  const packageJson = require('../package.json');
  program
    .version(packageJson.version)
    .description(packageJson.description)
    .argument('<name>', 'app name')
    .action(async name => {
      try {
        const spinner = ora(chalk.blackBright(`Creating ${name}`));
        spinner.start();
        const tmpdir = await tmp.dir({ unsafeCleanup: true });
        fs.copySync(path.join(__dirname, '../template'), tmpdir.path);

        await generator({}, tmpdir.path);

        fs.copySync(tmpdir.path, `${process.cwd()}/${name}`);

        await tmpdir.cleanup();
        spinner.succeed(chalk.greenBright(`The ${name} has been generated!`));
      } catch (error) {
        process.exit(0);
      }
    })
    .parse(process.argv);
};

export = { init };
