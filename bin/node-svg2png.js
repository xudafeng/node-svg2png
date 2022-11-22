#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const program = require('commander');
const { EOL } = require('os');
const path = require('path');
const { render } = require('../lib/node-svg2png');
const pkg = require('../package');

program
  .option('-v, --versions', 'show version and exit')
  .option('-s, --source <s>', 'source file path')
  .option('--verbose', 'show more debugging information')
  .usage('<command> [options] [arguments]')
  .helpInformation = function() {
    // eslint-disable-next-line no-sparse-arrays
    return [
      '',
      '  ' + chalk.white(pkg.description),
      '',
      '  Usage:',
      '',
      '    ' + this._name + ' ' + this.usage(),,
      '',
      '  Commands:',
      '',
      '',
      '  Options:',
      '',
      '' + this.optionHelp().replace(/^/gm, '    '),
      '',
      '  Further help:',
      '',
      '  ' + chalk.white(pkg.homepage),
      '',
      ''
    ].join(EOL);
  };

program.parse(process.argv);

if (program.versions) {
  console.info('%s  %s%s', EOL, pkg.version, EOL);
  process.exit(0);
}

const source = program.getOptionValue('source');

render({
  sourceFile: path.resolve(process.cwd(), source)
});
