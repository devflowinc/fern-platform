import { SerializableFile } from "@fern-ui/ui";
import fetch from "node-fetch";

export async function resolveSerializableFile(
    file: Pick<SerializableFile, "dataUrl" | "type">,
): Promise<[contentType: string | undefined, ArrayBuffer]> {
    if (file.dataUrl.startsWith("https:")) {
        const response = await fetch(file.dataUrl);
        const buffer = Buffer.from(await response.arrayBuffer());
        return [response.headers.get("Content-Type") ?? file.type, buffer];
    } else if (file.dataUrl.startsWith("http:")) {
        throw new Error("HTTP is not supported: " + file.dataUrl);
    } else if (file.dataUrl.startsWith("data:")) {
        const [header, base64String] = file.dataUrl.substring("data:".length).split(",");
        if (header == null || base64String == null) {
            throw new Error("Invalid data URL: " + file.dataUrl);
        }
        const bstr = Buffer.from(base64String, "base64");
        return [file.type, bstr];
    } else {
        throw new Error("Invalid data URL: " + file.dataUrl);
    }
}