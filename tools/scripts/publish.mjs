/**
 * This is a minimal script to publish your package to "npm".
 * This is meant to be used as-is or customize as you see fit.
 *
 * This script is executed on "dist/path/to/library" as "cwd" by default.
 *
 * You might need to authenticate with NPM before running this script.
 */

import {execSync, spawnSync} from 'child_process';
import {writeFileSync} from 'fs';
import chalk from 'chalk';
import semver from 'semver';
import devkit from '@nx/devkit';

const {readCachedProjectGraph, readJsonFile} = devkit;

function invariant(condition, message) {
    if (!condition) {
        console.error(chalk.bold.red(message));
        process.exit(1);
    }
}

function getNextVersion(name, increase, currentVersion) {
    const {status, stdout} = spawnSync(
        'npm',
        ['view', `@ng-solid/${name}`, `dist-tags`, '--json', registry !== 'undefined' ? `--registry=${registry}` : ''].filter(Boolean),
        {encoding: 'utf-8'}
    );
    if (status === 0) {
        const formatted = stdout.replace(/\n/g, '');
        const {latest, next} = JSON.parse(formatted);
        currentVersion = next && semver.lte(latest, next) ? next : latest;
        currentVersion = semver.inc(currentVersion, increase);
    }
    return currentVersion;
}

// Executing publish script: node path/to/publish.mjs {name} --increase {increase} --tag {tag}
// Default "tag" to "next" so we won't publish the "latest" tag by accident.
const [, , name, increase = 'patch', tag = 'latest', registry] = process.argv;

invariant(
    ['patch', 'minor', 'major'].includes(increase),
    `No increase provided or increase did not match Semantic Versioning, expected: patch, minor or mayor, got '${increase}'.`
);

const {nodes} = readCachedProjectGraph();
const project = nodes[name];

invariant(
    project,
    `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`
);

const [outputPath] = project.data?.targets?.build?.outputs;

invariant(
    outputPath,
    `Could not find "build.options.outputPath" of project "${name}". Is project.json configured  correctly?`
);

const outputDir = outputPath
    .replace('{workspaceRoot}', '.')
    .replace('{projectRoot}', project.data.root)

process.chdir(outputDir);

// Updating the version in "package.json" before publishing
try {
    const json = readJsonFile('package.json');
    json.version = getNextVersion(name, increase, json.version);
    writeFileSync(`package.json`, JSON.stringify(json, null, 2));
} catch (e) {
    console.error(
        chalk.bold.red(`Error reading package.json file from library build output.`)
    );
}

// Execute "npm publish" to publish
execSync(
    `npm publish --access public --tag ${tag} ${registry && registry !== 'undefined'
        ? `--registry ${registry}`
        : ''
    }`
);
