'use server';

import { Write_client } from '@/sanity/lib/write-client';
import { parsedResponseString } from './utils';

export const createAction = async (FormData: any, type: string) => {
    try {
        const result = await Write_client.createOrReplace({ _type: type, ...FormData });
        return parsedResponseString({
            ...result,
            error: '',
            status: 'SUCCESS',
        });
    } catch (err) {
        const error = err as Error;
        return parsedResponseString({
            error: error?.message || 'Unknown error',
            status: 'ERROR',
        });
    }
};

export const deleteAction = async (id: string, type: string) => {
    try {
        const document = await Write_client.fetch(`*[_id == $id && _type == $type][0]`, {
            id: id.toString(),
            type,
        });
        if (!document) {
            return parsedResponseString({
                error: 'Document not found',
                status: 'ERROR',
            });
        }
        const result = await Write_client.delete(id?.toString());
        return parsedResponseString({
            ...result,
            error: '',
            status: 'SUCCESS',
        });
    } catch (err) {
        const error = err as Error;
        return parsedResponseString({
            error: error?.message || 'Unknown error',
            status: 'ERROR',
        });
    }
};
