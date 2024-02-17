import withApiData from './withApiData';
import { configure } from './actions/configure';
import { afterRehydrate } from './actions/afterRehydrate';
import { purgeAll } from './actions/purgeAll';
import { getRequest } from './selectors/getRequest';
import { getResultData } from './selectors/getResultData';
import { invalidateRequest } from './actions/invalidateRequest';
import { performRequest, setRequestHandler } from './actions/performRequest';
import getDataFromTree from './getDataFromTree';
import { getEntity } from './selectors/getEntity';
import reducer, { State } from './reducer';
import useApiData from './useApiData';
import useActions from './useActions';
import { NetworkStatus, NormalizeResult, NormalizedData, EndpointParams, DataRequest, GlobalConfig, Method, EndpointConfig, ConfigBeforeProps, ConfigAfterProps, Binding, Actions, ParseMethod, RequestConfig, HookOptions } from './types';
export { withApiData, configure, performRequest, getRequest, getResultData, getEntity, getDataFromTree, invalidateRequest, afterRehydrate, purgeAll, reducer, setRequestHandler, State, useApiData, useActions, NetworkStatus, NormalizeResult, NormalizedData, EndpointParams, DataRequest, GlobalConfig, Method, EndpointConfig, ConfigBeforeProps, ConfigAfterProps, Binding, Actions, ParseMethod, RequestConfig, HookOptions, };
/**
 * @deprecated
 */
export declare const configureApiData: (globalConfig: GlobalConfig, endpointConfig: {
    [endpointKey: string]: EndpointConfig;
}) => import("./actions/configure").ConfigureAction;
/**
 * @deprecated
 */
export declare const getApiDataRequest: (state: State, endpointKey: string, params?: EndpointParams | undefined, instanceId?: string) => DataRequest | undefined;
/**
 * @deprecated
 */
export declare const purgeAllApiData: () => import("./actions/purgeAll").PurgeAllAction;
/**
 * @deprecated
 */
export declare const invalidateApiDataRequest: (endpointKey: string, params?: EndpointParams | undefined, instanceId?: string) => import("./actions/invalidateRequest").InvalidateRequestAction;
/**
 * @deprecated
 */
export declare const performApiRequest: (endpointKey: string, inputParams?: EndpointParams | undefined, body?: any, instanceId?: string | undefined, bindingsStore?: import("./helpers/createBinding").BindingsStore | undefined, customConfig?: Partial<EndpointConfig> | undefined) => (dispatch: import("redux").Dispatch<import("redux").AnyAction>, getState: () => {
    apiData: State;
}) => Promise<Binding<any, any, EndpointParams, any>>;
/**
 * @deprecated
 */
export declare const useRequestHandler: (requestHandler: import("./types").RequestHandler) => void;
/**
 * @deprecated
 */
export declare type ApiDataState = State;
/**
 * @deprecated
 */
export declare type ApiDataRequest = DataRequest;
/**
 * @deprecated
 */
export declare type ApiDataGlobalConfig = GlobalConfig;
/**
 * @deprecated
 */
export declare type ApiDataEndpointConfig = EndpointConfig;
/**
 * @deprecated
 */
export declare type ApiDataConfigBeforeProps = ConfigBeforeProps;
/**
 * @deprecated
 */
export declare type ApiDataConfigAfterProps = ConfigAfterProps;
/**
 * @deprecated
 */
export interface ApiDataBinding<T> extends Binding<T, any, EndpointParams, any> {
}
