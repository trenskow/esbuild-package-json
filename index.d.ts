//
// index.d.ts
// @trenskow/esbuild-package-json
//
// Created by Kristian Trenskow on 2024/12/18
// See license in LICENSE.
//

import { Plugin } from 'esbuild';

interface PostProcessOptions {
	source: string;
	destination: string;
	packageJson: Record<string, any>;
}

interface PackageJsonOptions {
	source?: string = 'package.json';
	destination: string;
	keyPaths?: string[];
	additional?: Record<string, any>;
	postProcess?: (options: PostProcessOptions) => Promise<void> | void;
};

export default function packageJsonPlugin(
	options: PackageJsonOptions
): Plugin;
