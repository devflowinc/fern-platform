/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface BaseRepository {
    id: FernRegistry.RepositoryId;
    name: string;
    /** The organization name within Github, e.g. fern-api. */
    owner: string;
    /** The full name of the repository, e.g. fern-api/fern. It includes the owner, as well as the name of the repository. */
    fullName: string;
    url: string;
    /** The Fern organization ID of the repository owner. */
    repositoryOwnerOrganizationId: FernRegistry.OrgId;
    defaultBranchChecks: FernRegistry.CheckRun[];
}
