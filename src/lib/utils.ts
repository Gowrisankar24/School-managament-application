export function parsedResponseString<T>(response: T) {
    return JSON.parse(JSON.stringify(response));
}
