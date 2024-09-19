/**
 * This file was auto-generated by Fern from our API Definition.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import * as errors from "../../../../errors/index";
/**
 * Produces an internal schema to easily track and view pull requests across Fern-managed repositories. This API is named `git` to allow for flexibility in adding other git providers down the line (e.g. gitlab).
 */
export class GitService {
    constructor(methods, middleware = []) {
        this.methods = methods;
        this.router = express.Router({ mergeParams: true }).use(express.json({
            strict: false,
        }), ...middleware);
    }
    addMiddleware(handler) {
        this.router.use(handler);
        return this;
    }
    toRouter() {
        this.router.get("/repository/:repositoryOwner/:repositoryName", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getRepository(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    console.warn(`Endpoint 'getRepository' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.get("/repository/list", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.listRepositories(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    console.warn(`Endpoint 'listRepositories' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.put("/repository/upsert", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.upsertRepository(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    console.warn(`Endpoint 'upsertRepository' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.delete("/repository/:repositoryOwner/:repositoryName/delete", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.deleteRepository(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    console.warn(`Endpoint 'deleteRepository' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.get("/pull-request/:repositoryOwner/:repositoryName/:pullRequestNumber", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getPullRequest(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    console.warn(`Endpoint 'getPullRequest' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.get("/pull-request/list", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.listPullRequests(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    console.warn(`Endpoint 'listPullRequests' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.put("/pull-request/upsert", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.upsertPullRequest(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    console.warn(`Endpoint 'upsertPullRequest' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.delete("/pull-request/:repositoryOwner/:repositoryName/:pullRequestNumber/delete", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.deletePullRequest(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    console.warn(`Endpoint 'deletePullRequest' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        return this.router;
    }
}
