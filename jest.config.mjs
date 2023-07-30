import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	collectCoverage: true,
	coverageDirectory: "coverage/jest",
	coverageReporters: ["lcov", "text"],
	coveragePathIgnorePatterns: [
		"/node_modules/",
		"/src/components/Theme",
	],
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},
	preset: "ts-jest",
	testEnvironment: "jest-environment-jsdom",
	testMatch: ["**/src/**/?(*.)+(test).ts?(x)"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
