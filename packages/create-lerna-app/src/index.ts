import { program } from 'commander';
import chalk from 'chalk';
import execa from 'execa';
import tmp from 'tmp-promise';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import generator from '@luozhu/template-generator';
import { isDirEmpty } from '@luozhu/node';

const init = (): void => {
  const packageJson = require('../package.json');
  program
    .version(packageJson.version)
    .description(packageJson.description)
    .argument('<name>', 'app name')
    .action(async name => {
      const spinner = ora(chalk.blackBright(`Creating ${name}`));
      try {
        spinner.start();
        const rootDir = `${process.cwd()}/${name}`;
        if (fs.existsSync(rootDir) && !(await isDirEmpty(rootDir))) {
          spinner.fail(
            chalk.red(`Cannot initialize new project because directory ${rootDir} is not empty.`)
          );
          process.exit(0);
        }
        const tmpdir = await tmp.dir({ unsafeCleanup: true });
        fs.copySync(path.join(__dirname, '../template'), tmpdir.path);
        await generator({}, tmpdir.path);

        fs.copySync(tmpdir.path, rootDir);
        execa.commandSync('git init', {
          cwd: rootDir,
          stdout: 'inherit',
          stderr: 'inherit',
          shell: true,
        });
        await tmpdir.cleanup();
        spinner.succeed(chalk.greenBright(`The ${name} has been generated!`));
      } catch (error) {
        spinner.fail(chalk.red(error.message));
        process.exit(0);
      }
    })
    .parse(process.argv);
};

export = { init };
