/**
 * This file was auto-generated by Fern from our API Definition.
 */
import express from "express";
import { RootService } from "./api/service/RootService";
import { SnippetsFactoryService } from "./api/resources/snippetsFactory/service/SnippetsFactoryService";
import { ReadService as api_v1_read_RootService } from "./api/resources/api/resources/v1/resources/read/service/ReadService";
import { RegisterService as api_v1_register_RootService } from "./api/resources/api/resources/v1/resources/register/service/RegisterService";
import { ReadService as docs_v1_read_RootService } from "./api/resources/docs/resources/v1/resources/read/service/ReadService";
import { WriteService as docs_v1_write_RootService } from "./api/resources/docs/resources/v1/resources/write/service/WriteService";
import { ReadService as docs_v2_read_RootService } from "./api/resources/docs/resources/v2/resources/read/service/ReadService";
import { WriteService as docs_v2_write_RootService } from "./api/resources/docs/resources/v2/resources/write/service/WriteService";
export declare function register(expressApp: express.Express | express.Router, services: {
    _root: RootService;
    snippetsFactory: SnippetsFactoryService;
    api: {
        v1: {
            read: {
                _root: api_v1_read_RootService;
            };
            register: {
                _root: api_v1_register_RootService;
            };
        };
    };
    docs: {
        v1: {
            read: {
                _root: docs_v1_read_RootService;
            };
            write: {
                _root: docs_v1_write_RootService;
            };
        };
        v2: {
            read: {
                _root: docs_v2_read_RootService;
            };
            write: {
                _root: docs_v2_write_RootService;
            };
        };
    };
}): void;