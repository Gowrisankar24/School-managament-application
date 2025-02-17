export function parsedResponseString<T>(response: T) {
    return JSON.parse(JSON.stringify(response));
}

export const reusableFunc = (value: Array<{ _id: string }>) => value?.map(d => d._id);

export const studentCountFunc = (value: Array<{ [key: string]: string }>, category: string) =>
    value?.filter(d => d?.name == category)[0]?.count;
