export declare const nestConfig: {
    readonly rootDir: "src";
    readonly testRegex: ".*\\.spec\\.ts$";
    readonly transform: {
        readonly '^.+\\.(t|j)s$': "ts-jest";
    };
    readonly collectCoverageFrom: ["**/*.(t|j)s"];
    readonly coverageDirectory: "../coverage";
    readonly testEnvironment: "node";
    readonly collectCoverage: true;
    readonly coverageProvider: "v8";
    readonly moduleFileExtensions: ["js", "ts", "json"];
};
//# sourceMappingURL=nest.d.ts.map