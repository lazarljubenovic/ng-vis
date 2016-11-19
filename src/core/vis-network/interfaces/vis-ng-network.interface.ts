import {VisNgNetworkOptions} from "./vis-ng-network-options.interface";

export interface VisNgNetworkEventArgument {
    nodes?: (string | number)[]; // array of selected nodeIds
    edges?: (string | number)[]; // array of selected edgeIds
    event?: MouseEvent;
    pointer?: {
        DOM?: {x: number, y: number};
        canvas?: {x: number, y: number};
    };
}

export declare type VisNgNetworkEventCallback = (event: VisNgNetworkEventArgument) => any;

export interface VisNgNetwork {
    // Global methods for the network
    destroy(): void;
    setData(data: {nodes: any, edges: any}): void;
    setOptions(options: VisNgNetworkOptions): void;
    on(eventName: string, callback: VisNgNetworkEventCallback): void;
    off(eventName: string, callback?: VisNgNetworkEventCallback): void;
    once(eventName: string, callback: VisNgNetworkEventCallback): void;
}

// For a lot of these I have no idea what are the types of parameters.
// Docs are kinda shitty for types.
export interface VsNgDataSet {
    // Methods

    add(data: any[], senderId?: any): number[];
    clear(senderId?: any): number[];
    distinct(field: any): any[];
    flush(): void;
    forEach(callback: Function, options?: any): void;
    get(): any[];
    get(options?, data?): Object | any[];
    get(id, options?, data?): Object | any[];
    get(ids, options?, data?): Object | any[];
    getDataSet(): any;
    getIds(options?): number[];
    //...
    remove(id, senderId?): number[];
    remove(ids, senderId?): number[];
    //...
    update(data, senderId?): number[];


    // Properties

    /**
     * The number of items in the DataSet.
     */
    length: number;
}
