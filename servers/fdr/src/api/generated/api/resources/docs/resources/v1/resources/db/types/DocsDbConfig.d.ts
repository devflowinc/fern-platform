/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface DocsDbConfig {
    title?: string;
    defaultLanguage?: FernRegistry.docs.v1.commons.ProgrammingLanguage;
    announcement?: FernRegistry.docs.v1.commons.AnnouncementConfig;
    navigation: FernRegistry.docs.v1.db.NavigationConfig;
    navbarLinks?: FernRegistry.docs.v1.commons.NavbarLink[];
    footerLinks?: FernRegistry.docs.v1.commons.FooterLink[];
    logoHeight?: FernRegistry.docs.v1.read.Height;
    logoHref?: FernRegistry.docs.v1.commons.Url;
    favicon?: FernRegistry.docs.v1.commons.FileId;
    metadata?: FernRegistry.docs.v1.commons.MetadataConfig;
    redirects?: FernRegistry.docs.v1.commons.RedirectConfig[];
    backgroundImage?: FernRegistry.docs.v1.commons.FileId;
    colorsV3?: FernRegistry.docs.v1.read.ColorsConfigV3;
    layout?: FernRegistry.docs.v1.commons.DocsLayoutConfig;
    typographyV2?: FernRegistry.docs.v1.commons.DocsTypographyConfigV2;
    analyticsConfig?: FernRegistry.docs.v1.commons.AnalyticsConfig;
    integrations?: FernRegistry.docs.v1.commons.IntegrationsConfig;
    css?: FernRegistry.docs.v1.commons.CssConfig;
    js?: FernRegistry.docs.v1.commons.JsConfig;
    logo?: FernRegistry.docs.v1.commons.FileId;
    logoV2?: FernRegistry.docs.v1.commons.ThemedFileId;
    colors?: FernRegistry.docs.v1.commons.ColorsConfig;
    colorsV2?: FernRegistry.docs.v1.commons.ColorsConfigV2;
    typography?: FernRegistry.docs.v1.commons.DocsTypographyConfig;
}
