'use strict';

const { series, parallel } = require('gulp');
const { rm } = require('node:fs/promises');
const esbuild = require('esbuild');

async function clean() {
    await rm('dist', { recursive: true, force: true });
}

const sharedOptions = {
    entryPoints: ['src/DamWebParser.js'],
    bundle: true,
    format: 'iife',
    globalName: 'DamWebParser',
    platform: 'browser',
    target: 'es2017',
};

async function build() {
    await esbuild.build({
        ...sharedOptions,
        outfile: 'dist/draughts-damweb-parser.js',
    });
}

async function buildMin() {
    await esbuild.build({
        ...sharedOptions,
        outfile: 'dist/draughts-damweb-parser.min.js',
        minify: true,
    });
}

exports.clean = clean;
exports.build = series(clean, parallel(build, buildMin));
exports.default = exports.build;
