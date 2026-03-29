var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { config as baseConfig } from './base';
export var nestConfig = __assign(__assign({}, baseConfig), { rootDir: 'src', testRegex: '.*\\.spec\\.ts$', transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    }, collectCoverageFrom: ['**/*.(t|j)s'], coverageDirectory: '../coverage', testEnvironment: 'node' });
