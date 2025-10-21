import { RemoteHelperSettings } from '@root/src/app/api-internal/models/generic-service/generic-remote-service-option-item';

/**
 * Interface representing generic remote service options for a specific type.
 *
 * @template T The type of the data that the remote service is expected to handle.
 *
 * @property {RemoteHelperSettings<any, T[]>} [list] An optional property that defines the configuration
 * for a list operation within the remote service. It represents an item containing details needed to handle
 * list-based data related to the specified type.
 */
export interface IGenericRemoteServiceOptions<T> {
   list?: RemoteHelperSettings<any, T[]>;
}
