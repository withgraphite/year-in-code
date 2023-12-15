import {WebpackOverrideFn} from '@remotion/bundler'
import {enableTailwind} from '@remotion/tailwind'

export const webpackOverride: WebpackOverrideFn = currentConfiguration => {
	return enableTailwind(currentConfiguration)
}
