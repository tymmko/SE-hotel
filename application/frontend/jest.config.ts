import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	testMatch: ['**/__tests__/**/*.(test|spec).[jt]s?(x)'],
	reporters: [
		'default',
		[
			'jest-junit',
			{
				outputDirectory: 'test-results',
				outputName: 'junit.xml'
			}
		]
	]
};

export default config;
