/// <reference path="./visjs.d.ts" />

import {Injectable, ElementRef} from "@angular/core";
import * as vis from "vis";
import {VisNgNetworkEdge} from "./interfaces/vis-ng-network-edge.interface";
import {VisNgNetworkNode} from "./interfaces/vis-ng-network-node.interface";
import {VisNgNetworkOptions} from "./interfaces/vis-ng-network-options.interface";
import {
    VisNgNetwork, VsNgDataSet,
    VisNgNetworkEventCallback
} from "./interfaces/vis-ng-network.interface";

@Injectable()
export class VisNetworkService {

    private network: VisNgNetwork;

    private nodes: VsNgDataSet;
    private edges: VsNgDataSet;
    private container: ElementRef;
    private options: VisNgNetworkOptions;

    constructor() {
    }

    public getVisNode(nodeId: string | number): any {
        return this.nodes.get(nodeId);
    }

    /**
     * Attach vis event to the current network.
     * @param eventName
     * @param callback
     */
    public attachEvent(eventName: string, callback: VisNgNetworkEventCallback) {
        this.network.on(eventName, callback);
    }

    public addNode(node: any): void {
        this.nodes.add(node);
    }

    public updateNode(node: any): void {
        this.nodes.update(node)
    }

    public removeNode(nodeId: number | string): void {
        this.nodes.remove(nodeId);
    }

    public addEdge(edge: any): void {
        this.edges.add(edge);
    }

    public updateEdge(edge: any): void {
        this.edges.update(edge);
    }

    public removeEdge(edgeId: number | string): void {
        this.edges.remove(edgeId);
    }

    public onChange(newState): void {
        this.network.setOptions(newState.options);

        const diffNodes = this.diff(this.nodes.get(), newState.nodes);
        const diffEdges = this.diff(this.edges.get(), newState.edges);

        diffNodes.added.forEach(n => this.nodes.add(n));
        diffNodes.changed.forEach(n => this.nodes.update(n));
        diffNodes.deleted.forEach(n => this.nodes.remove({id: n}));

        diffEdges.added.forEach(e => this.edges.add(e));
        diffEdges.changed.forEach(e => this.edges.update(e));
        diffEdges.deleted.forEach(e => this.edges.remove({id: e}));
    }

    public diff(oldValue: any[], newValue: any[]) {
        let diffResult = {added: [], deleted: [], changed: []};

        diffResult.deleted = oldValue
            .filter(oldV => newValue.map(e => e.id).indexOf(oldV.id) == -1)
            .map(oldV => oldV.id);

        diffResult.added = newValue.filter(newV => oldValue.map(e => e.id).indexOf(newV.id) == -1);

        diffResult.changed = newValue.filter(newV => {
            let el = oldValue.find(oldV => oldV.id == newV.id);
            return el ? Object.keys(el).some(key => newV[key] != el[key]) : false;
        });

        return diffResult;
    }

    private initDraw(): void {
        let data = {
            nodes: this.nodes,
            edges: this.edges
        };
        let options = this.options;
        this.network = new vis.Network(this.container.nativeElement, data, options);
    }

    public initializeGraph(container: ElementRef,
                           nodes: VisNgNetworkNode[],
                           edges: VisNgNetworkEdge[],
                           options: VisNgNetworkOptions): void {
        this.container = container;
        this.nodes = new vis.DataSet(nodes);
        this.edges = new vis.DataSet(edges);
        this.options = options;
        this.initDraw();
    }

    public destroy() {
        this.network.destroy();
    }

}
