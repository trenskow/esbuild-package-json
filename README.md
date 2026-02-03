@trenskow/esbuild-package-json
----

A esbuild plugin for generating `package.json` files.

# Usage

````javascript

	import { build } from 'esbuild';
	import packageJson from '@trenskow/esbuild-package-json';

	(async () => {
	const res = await build({
		entryPoints: ['./src/main.ts'],
		bundle: true,
		watch: true,
		outfile: './dist/main.js',
		plugins: [
			packageJson({
				source: 'package.json',
				destination: 'dist/package.json',
				keyPaths: ['name', 'version', /* keys to copy to */],
				additional: {
					/* Additional keys to be merged into destination package.json */
				},
				postProcess: async ({ source, destination, packageJson }) => {
					/* Any work that needs to be done before saving. */
					/* `packageJson` is the object that will be saved to the destination `package.json`. */
				}
			})
		],
	});
	})();
````

# License

See license in LICENSE.
