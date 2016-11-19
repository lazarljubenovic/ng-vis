import {VisNgNetworkOptionsNodes} from "./vis-ng-network-options.interface";

export interface VisNgNetworkNode {
    id: string | number;
    label: string | number;
    options?: VisNgNetworkOptionsNodes;
}
