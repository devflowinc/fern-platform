/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernNavigation from "../index";

export interface WebhookNode extends FernNavigation.WithNodeMetadata, FernNavigation.WithApiDefinitionId {
    type: "webhook";
    method: FernNavigation.HttpMethod;
    webhookId: FernNavigation.WebhookId;
}