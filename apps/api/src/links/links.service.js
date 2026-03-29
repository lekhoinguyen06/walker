var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Injectable } from '@nestjs/common';
import * as escapeHtml from 'escape-html';
var LinksService = function () {
    var _classDecorators = [Injectable()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LinksService = _classThis = /** @class */ (function () {
        function LinksService_1() {
            this._links = [
                {
                    id: 0,
                    title: 'Installation',
                    url: 'https://turborepo.dev/docs/getting-started/installation',
                    description: 'Get started with Turborepo in a few moments using',
                },
                {
                    id: 1,
                    title: 'Crafting',
                    url: 'https://turborepo.dev/docs/crafting-your-repository',
                    description: 'Architecting a monorepo is a careful process.',
                },
                {
                    id: 2,
                    title: 'Add Repositories',
                    url: 'https://turborepo.dev/docs/getting-started/add-to-existing-repository',
                    description: 'Turborepo can be incrementally adopted in any repository, single or multi-package, to speed up the developer and CI workflows of the repository.',
                },
            ];
        }
        LinksService_1.prototype.create = function (createLinkDto) {
            var _a;
            var safeTitle = escapeHtml((_a = createLinkDto.title) !== null && _a !== void 0 ? _a : '');
            return "TODO: This action should add a new link '".concat(safeTitle, "'");
        };
        LinksService_1.prototype.findAll = function () {
            return this._links;
        };
        LinksService_1.prototype.findOne = function (id) {
            return "TODO: This action should return a Link with id #".concat(id);
        };
        LinksService_1.prototype.update = function (id, updateLinkDto) {
            var _a;
            var safeTitle = escapeHtml((_a = updateLinkDto.title) !== null && _a !== void 0 ? _a : '');
            return "TODO: This action should update a #".concat(id, " link ").concat(safeTitle);
        };
        LinksService_1.prototype.remove = function (id) {
            return "TODO: This action should remove a #".concat(id, " link");
        };
        return LinksService_1;
    }());
    __setFunctionName(_classThis, "LinksService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LinksService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LinksService = _classThis;
}();
export { LinksService };
