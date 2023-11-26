/**
 * This is a minimal script to publish your package to "npm".
 * This is meant to be used as-is or customize as you see fit.
 *
 * This script is executed on "dist/path/to/library" as "cwd" by default.
 *
 * You might need to authenticate with NPM before running this script.
 */

import { execSync, spawnSync } from 'child_process';
import { writeFileSync } from 'fs';
import chalk from 'chalk';
import semver from 'semver';
import devkit from '@nx/devkit';
import path from 'path';

const { readCachedProjectGraph, readJsonFile } = devkit;

function invariant(condition, message) {
  if (!condition) {
    console.error(chalk.bold.red(message));
    process.exit(1);
  }
}

function getNextVersion(name, increase) {
  const { status, stdout } = spawnSync(
    'npm',
    ['view', `@ng-solid/${name}`, `dist-tags`, '--json'],
    { encoding: 'utf-8' }
  );
  let { version } = readJsonFile(path.resolve('package.json'));
  if (status === 0) {
    const formatted = stdout.replace(/\n/g, '');
    const { latest, next } = JSON.parse(formatted);
    version = next && semver.lte(latest, next) ? next : latest;
    version = semver.inc(version, increase);
  }
  return version;
}

// Executing publish script: node path/to/publish.mjs {name} --increase {increase} --tag {tag}
// Default "tag" to "next" so we won't publish the "latest" tag by accident.
const [, , name, increase = 'patch', tag = 'next'] = process.argv;

const graph = readCachedProjectGraph();
const project = graph.nodes[name];

invariant(
  ['patch', 'minor', 'major'].includes(increase),
  `No increase provided or increase did not match Semantic Versioning, expected: patch, minor or mayor, got '${increase}'.`
);

invariant(
  project,
  `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`
);

const { outputPath } = project.data?.targets?.build?.options;
invariant(
  outputPath,
  `Could not find "build.options.outputPath" of project "${name}". Is project.json configured  correctly?`
);

process.chdir(outputPath);

// Updating the version in "package.json" before publishing
try {
  const json = readJsonFile('package.json');
  json.version = getNextVersion(name, increase);
  writeFileSync(`package.json`, JSON.stringify(json, null, 2));
  console.log(`Package to version ${json.version}`);
} catch (e) {
  console.error(
    chalk.bold.red(`Error reading package.json file from library build output.`)
  );
}

execSync(`npm publish --public --tag=${tag}`);
