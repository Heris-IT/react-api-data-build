import { Binding, EndpointParams, HookOptions } from './types';
declare const useApiData: <T, F = unknown, Params extends EndpointParams = EndpointParams, Body_1 = any>(endpointKey: string, params?: Params | undefined, options?: HookOptions | undefined) => Binding<T, F, Params, Body_1>;
export default useApiData;
