export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.app.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'^@src/(.*)$': '<rootDir>/src/$1',
		'^@api/(.*)$': '<rootDir>/src/api/$1',
		'^@assets/(.*)$': '<rootDir>/src/assets/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
		'^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@routes/(.*)$': '<rootDir>/src/routes/$1',
		'^@store/(.*)$': '<rootDir>/src/store/$1',
		'^@styles/(.*)$': '<rootDir>/src/styles/$1',
		'^@types/(.*)$': '<rootDir>/src/types/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
	collectCoverageFrom: [
		'src/hooks/**/*.ts',
		'src/utils/**/*.ts',
		'!**/*.config.ts',
		'!**/index.ts',
	],
};
