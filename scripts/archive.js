#!/usr/bin/env node

const archiver = require("archiver");
const fs = require("fs");

const archive = archiver("zip");
const archiveFile = `dist/focal-v${process.argv[2]}.zip`;

archive.directory("dist/", false);
archive.pipe(fs.createWriteStream(archiveFile));
archive.finalize();
