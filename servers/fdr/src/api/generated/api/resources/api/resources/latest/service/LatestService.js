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
import * as errors from "../../../../../../errors/index";
export class LatestService {
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
        this.router.get("/load/:apiDefinitionId", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getApiLatest(req, {
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
                    switch (error.errorName) {
                        case "ApiDoesNotExistError":
                            break;
                        default:
                            console.warn(`Endpoint 'getApiLatest' unexpectedly threw ${error.constructor.name}.` +
                                ` If this was intentional, please add ${error.constructor.name} to` +
                                " the endpoint's errors list in your Fern Definition.");
                    }
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