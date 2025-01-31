import type { DocsV1Read } from "@fern-api/fdr-sdk/client/types";
import { ColorsConfig } from "@fern-platform/fdr-utils";
import tinycolor from "tinycolor2";
import { CSS_VARIABLES, getColorVariables } from "./getColorVariables";
import { getFontVariables } from "./getFontVariables";
import { getLayoutVariables } from "./getLayoutVariables";

export function renderThemeStylesheet(
  colorsConfig: ColorsConfig,
  typography: DocsV1Read.DocsTypographyConfigV2 | undefined,
  layoutConfig: DocsV1Read.DocsLayoutConfig | undefined,
  css: DocsV1Read.CssConfig | undefined,
  files: Record<DocsV1Read.FileId, DocsV1Read.File_>,
  hasTabs: boolean
): string {
  if (colorsConfig == null) {
    return "";
  }
  // const bg = getBgVariables(backgroundImage, files);
  const {
    fontFaces,
    cssVariables: fonts,
    additionalCss,
  } = getFontVariables(typography, files);
  const colors = getColorVariables(colorsConfig, files);
  const { root: layout, "max-lg": layoutMaxLg } = getLayoutVariables(
    layoutConfig,
    hasTabs
  );

  const cssVariables = {
    ...fonts,
    ...layout,
  };

  const bgColor = `#${tinycolor(`rgb(${colors.light[CSS_VARIABLES.BACKGROUND]})`).toHex()}`;
  const bgDarkColor = `#${tinycolor(`rgb(${colors.dark[CSS_VARIABLES.BACKGROUND]})`).toHex()}`;

  const inlinedCss = css?.inline?.join("\n\n") ?? "";

  return `
:root {
    ${Object.entries(cssVariables)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n    ")}
        
    ${Object.entries(colors.light)
      .filter(([, value]) => value != null)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n    ")}
}

@media (max-width: 1024px) {
    :root {
        ${Object.entries(layoutMaxLg)
          .map(([key, value]) => `${key}: ${value};`)
          .join("\n        ")}
    }
}


:is(.dark) {
    ${Object.entries(colors.dark)
      .filter(([, value]) => value != null)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n        ")}
}

${fontFaces.join("\n\n")}

html {
    background-color: ${bgColor};
}

html.dark {
    background-color: ${bgDarkColor};
}

${additionalCss}

${inlinedCss}
`;
}
