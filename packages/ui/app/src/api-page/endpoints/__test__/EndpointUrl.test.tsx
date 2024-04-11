/**
 * @vitest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { ResolvedEndpointPathParts } from "../../../resolver/types";
import { EndpointUrl } from "../EndpointUrl";

function lit(value: string): ResolvedEndpointPathParts.Literal {
    return { type: "literal", value };
}

function path(key: string): ResolvedEndpointPathParts.PathParameter {
    return {
        type: "pathParameter",
        key,
        valueShape: { type: "string", description: undefined, availability: undefined },
        hidden: false,
        description: undefined,
        availability: undefined,
    };
}

describe("EndpointUrl", () => {
    it("works with lit and path", async () => {
        render(
            <EndpointUrl
                environment="https://api.buildwithfern.com"
                path={[lit("/testing/"), path("id")]}
                method={"GET"}
                showEnvironment={true}
            />,
        );

        expect(screen.getByRole("button").textContent).toBe("https://api.buildwithfern.com/testing/:id");
    });

    it("renders full environment with basepath", async () => {
        render(
            <EndpointUrl
                environment="https://api.buildwithfern.com/with/basepath"
                path={[lit("/testing/"), path("id")]}
                method={"GET"}
                showEnvironment={true}
            />,
        );

        expect(screen.getByRole("button").textContent).toBe("https://api.buildwithfern.com/with/basepath/testing/:id");
    });
});