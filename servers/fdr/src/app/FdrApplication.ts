import { PrismaClient } from "@prisma/client";
import winston from "winston";
import { FdrDao } from "../db";
import { AlgoliaServiceImpl, type AlgoliaService } from "../services/algolia";
import {
    AlgoliaIndexSegmentDeleterServiceImpl,
    type AlgoliaIndexSegmentDeleterService,
} from "../services/algolia-index-segment-deleter";
import {
    AlgoliaIndexSegmentManagerServiceImpl,
    type AlgoliaIndexSegmentManagerService,
} from "../services/algolia-index-segment-manager";
import { AuthServiceImpl, type AuthService } from "../services/auth";
import { DatabaseServiceImpl, type DatabaseService } from "../services/db";
import { DocsDefinitionCache, DocsDefinitionCacheImpl } from "../services/docs-cache/DocsDefinitionCache";
import { RevalidatorService, RevalidatorServiceImpl } from "../services/revalidator/RevalidatorService";
import { S3ServiceImpl, type S3Service } from "../services/s3";
import { SlackService, SlackServiceImpl } from "../services/slack/SlackService";
import type { FdrConfig } from "./FdrConfig";

export interface FdrServices {
    readonly auth: AuthService;
    readonly db: DatabaseService;
    readonly algolia: AlgoliaService;
    readonly algoliaIndexSegmentDeleter: AlgoliaIndexSegmentDeleterService;
    readonly algoliaIndexSegmentManager: AlgoliaIndexSegmentManagerService;
    readonly s3: S3Service;
    readonly slack: SlackService;
    readonly revalidator: RevalidatorService;
}

export const LOGGER = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.json(),
        }),
    ],
});

export class FdrApplication {
    public readonly services: FdrServices;
    public readonly dao: FdrDao;
    public readonly docsDefinitionCache: DocsDefinitionCache;
    public readonly logger = LOGGER;

    public constructor(
        public readonly config: FdrConfig,
        services?: Partial<FdrServices>,
    ) {
        this.logger = winston.createLogger({
            level: config.logLevel,
            format: winston.format.json(),
            transports: [
                new winston.transports.Console({
                    format: winston.format.json(),
                }),
            ],
        });
        const prisma = new PrismaClient({
            log: ["info", "warn", "error"],
        });
        this.services = {
            auth: services?.auth ?? new AuthServiceImpl(this),
            db: services?.db ?? new DatabaseServiceImpl(prisma),
            algolia: services?.algolia ?? new AlgoliaServiceImpl(this),
            algoliaIndexSegmentDeleter:
                services?.algoliaIndexSegmentDeleter ?? new AlgoliaIndexSegmentDeleterServiceImpl(this),
            algoliaIndexSegmentManager:
                services?.algoliaIndexSegmentManager ?? new AlgoliaIndexSegmentManagerServiceImpl(this),
            s3: services?.s3 ?? new S3ServiceImpl(this),
            slack: services?.slack ?? new SlackServiceImpl(this),
            revalidator: services?.revalidator ?? new RevalidatorServiceImpl(),
        };
        this.dao = new FdrDao(prisma);
        this.docsDefinitionCache = new DocsDefinitionCacheImpl(this, this.dao);
    }
}