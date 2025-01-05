import 'server-only';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from '../env';

export const Write_client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
});

if (!Write_client.config().token) {
    throw new Error('Sanity api token not found');
}
