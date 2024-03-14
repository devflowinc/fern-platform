import { APIV1Read } from "@fern-api/fdr-sdk";
import { EMPTY_OBJECT } from "@fern-ui/core-utils";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useMemo } from "react";
import { CodeExampleClientDropdown } from "../../api-page/endpoints/CodeExampleClientDropdown";
import { EndpointUrlWithOverflow } from "../../api-page/endpoints/EndpointUrlWithOverflow";
import { CodeExample, CodeExampleGroup, generateCodeExamples } from "../../api-page/examples/code-example";
import { CodeSnippetExample } from "../../api-page/examples/CodeSnippetExample";
import { useNavigationContext } from "../../contexts/navigation-context";
import { FERN_LANGUAGE_ATOM } from "../../sidebar/atom";
import { findEndpoint } from "../../util/processRequestSnippetComponents";
import { ResolvedEndpointDefinition } from "../../util/resolver";

export declare namespace RequestSnippet {
    export interface Props {
        endpoint: string;
    }
    export interface InternalProps {
        path: string;
        method: APIV1Read.HttpMethod;
    }
}

const selectedClientAtom = atom<Record<string, CodeExample | undefined>>({});

function useSelectedClient(
    path: string,
    method: string,
    clients: CodeExampleGroup[],
): [CodeExample | undefined, (nextClient: CodeExample) => void] {
    const [selectedLanguage, setSelectedLanguage] = useAtom(FERN_LANGUAGE_ATOM);
    const [selectedClientMap, setSelectedClientMap] = useAtom(selectedClientAtom);
    const selectedClient =
        selectedClientMap[`${path}-${method}`] ??
        clients.find((c) => c.language === selectedLanguage)?.examples[0] ??
        clients[0]?.examples[0];

    const setSelectedClient = useCallback(
        (nextClient: CodeExample | ((prev: CodeExample | undefined) => CodeExample | undefined)) => {
            setSelectedClientMap((prev) => ({
                ...prev,
                [`${path}-${method}`]: typeof nextClient === "function" ? nextClient(selectedClient) : nextClient,
            }));
        },
        [setSelectedClientMap, path, method, selectedClient],
    );

    useEffect(() => {
        setSelectedClient((prev) => clients.find((c) => c.language === selectedLanguage)?.examples[0] ?? prev);
    }, [clients, selectedLanguage, setSelectedClient]);

    const handleClickClient = useCallback(
        (nextClient: CodeExample) => {
            setSelectedClient(nextClient);
            setSelectedLanguage(nextClient.language);
        },
        [setSelectedClient, setSelectedLanguage],
    );

    return [selectedClient, handleClickClient];
}

function extractEndpointPathAndMethod(endpoint: string): [APIV1Read.HttpMethod | undefined, string | undefined] {
    const [maybeMethod, path] = endpoint.split(" ");

    // parse method into APIV1Read.HttpMethod
    let method: APIV1Read.HttpMethod | undefined;

    if (maybeMethod != null) {
        method = maybeMethod.toUpperCase() as APIV1Read.HttpMethod;
    }

    // ensure that method is a valid HTTP method
    if (!Object.values(APIV1Read.HttpMethod).includes(method as APIV1Read.HttpMethod)) {
        return [undefined, undefined];
    }

    return [method, path];
}

export const EndpointRequestSnippet: React.FC<React.PropsWithChildren<RequestSnippet.Props>> = ({
    endpoint: endpointLocator,
}) => {
    const [method, path] = extractEndpointPathAndMethod(endpointLocator);

    if (method == null || path == null) {
        return null;
    }

    return <EndpointRequestSnippetInternal method={method} path={path} />;
};

const EndpointRequestSnippetInternal: React.FC<React.PropsWithChildren<RequestSnippet.InternalProps>> = ({
    method,
    path,
}) => {
    const { resolvedPath } = useNavigationContext();

    const endpoint = useMemo(() => {
        if (resolvedPath.type !== "custom-markdown-page") {
            return;
        }
        let endpoint: ResolvedEndpointDefinition | undefined;
        for (const api of Object.values(resolvedPath.apis)) {
            endpoint = findEndpoint({
                api,
                path,
                method,
            });
            if (endpoint) {
                break;
            }
        }
        return endpoint;
    }, [method, path, resolvedPath]);

    const clients = useMemo(() => generateCodeExamples(endpoint?.examples ?? []), [endpoint?.examples]);
    const [selectedClient, setSelectedClient] = useSelectedClient(path, method, clients);

    if (endpoint == null || selectedClient == null) {
        return null;
    }

    return (
        <div className="mb-5 mt-3">
            <CodeSnippetExample
                title={
                    <EndpointUrlWithOverflow
                        path={endpoint.path}
                        method={method}
                        environment={endpoint.defaultEnvironment?.baseUrl}
                    />
                }
                type="primary"
                actions={
                    clients.length > 1 ? (
                        <CodeExampleClientDropdown
                            clients={clients}
                            onClickClient={setSelectedClient}
                            selectedClient={selectedClient}
                        />
                    ) : undefined
                }
                code={selectedClient.code}
                language={selectedClient.language}
                json={EMPTY_OBJECT}
                scrollAreaStyle={{ maxHeight: "500px" }}
            />
        </div>
    );
};

export const EndpointResponseSnippet: React.FC<React.PropsWithChildren<RequestSnippet.Props>> = ({
    endpoint: endpointLocator,
}) => {
    const [method, path] = extractEndpointPathAndMethod(endpointLocator);

    if (method == null || path == null) {
        return null;
    }

    return <EndpointResponseSnippetInternal method={method} path={path} />;
};

const EndpointResponseSnippetInternal: React.FC<React.PropsWithChildren<RequestSnippet.InternalProps>> = ({
    path,
    method,
}) => {
    const { resolvedPath } = useNavigationContext();

    const endpoint = useMemo(() => {
        if (resolvedPath.type !== "custom-markdown-page") {
            return;
        }
        let endpoint: ResolvedEndpointDefinition | undefined;
        for (const api of Object.values(resolvedPath.apis)) {
            endpoint = findEndpoint({
                api,
                path,
                method,
            });
            if (endpoint) {
                break;
            }
        }
        return endpoint;
    }, [method, path, resolvedPath]);

    const clients = useMemo(() => generateCodeExamples(endpoint?.examples ?? []), [endpoint?.examples]);
    const [selectedClient] = useSelectedClient(path, method, clients);

    if (endpoint == null) {
        return null;
    }

    const responseJson = selectedClient?.exampleCall.responseBody?.value;

    if (responseJson == null) {
        return null;
    }

    const responseJsonString = JSON.stringify(responseJson, null, 2);

    return (
        <div className="mb-5 mt-3">
            <CodeSnippetExample
                title="Response"
                type="primary"
                // actions={undefined}
                code={responseJsonString}
                language="json"
                json={responseJson}
                scrollAreaStyle={{ maxHeight: "500px" }}
            />
        </div>
    );
};