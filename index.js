//
// index.js
// @trenskow/esbuild-package-json
//
// Created by Kristian Trenskow on 2024/12/18
// See license in LICENSE.
//

import { dirname } from 'path';
import { readFile, writeFile, mkdir } from 'fs/promises';

import keyd from 'keyd';

export default ({
	source = 'package.json',
	destination,
	keyPaths,
	additional = {},
	postProcess
} = {}) => {

	if (!source) {
		throw new Error('[package-json] source is required');
	}

	return {
		name: 'package-json',

		setup(build) {
			build.onStart(async () => {

				console.info('[processing] package.json');

				await mkdir(dirname(destination), { recursive: true });

				const sourceContent = await readFile(source, 'utf8');

				keyPaths = keyPaths || keyd(sourceContent).keyPaths();

				const indentation = sourceContent.match(/^( +|\t)/m)
					?.sort((a, b) => a.length - b.length)?.[0] || '  ';

				const sourcePackageJson = JSON.parse(sourceContent);

				const destinationPackageJson = Object.assign({}, keyPaths.reduce((accumulator, keyPath) => {
					const value = keyd(sourcePackageJson).get(keyPath);
					if (typeof value !== 'undefined') {
						keyd(accumulator).set(keyPath, value);
					}
					return accumulator;
				}, {}), additional);

				if (typeof postProcess === 'function') {
					await postProcess({
						source,
						destination,
						packageJson: destinationPackageJson
					});
				}

				await writeFile(destination, JSON.stringify(destinationPackageJson, null, indentation), 'utf8');

			});
		}
	};

};
