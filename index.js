#!/usr/bin/env node

import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prosessFile } from './cli/utils.js';

const fileName = path.join(path.dirname(fileURLToPath(import.meta.url)), process.argv[2] ?? `logs.log`);
prosessFile(fileName);

