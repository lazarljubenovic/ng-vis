/// <reference path="./visjs.d.ts" />

import {Injectable, ElementRef} from "@angular/core";
import * as vis from "vis";
import {VglEdge} from "./edge.interface";
import {VglNode} from "./node.interface";
import {Edge} from "graphlib";
import {VisNgOptions} from "./options.interface";

@Injectable()
export class VisGraphService {

    private network: any;

    private nodes: any;
    private edges: any;
    private container: ElementRef;
    private options: VisNgOptions;

    constructor() {
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
        var data = {
            nodes: this.nodes,
            edges: this.edges
        };
        var options = this.options;
        this.network = new vis.Network(this.container.nativeElement, data, options);
    }

    public initializeGraph(container: ElementRef,
                           nodes: VglNode[],
                           edges: VglEdge[],
                           options: VisNgOptions): void {
        this.container = container;
        this.nodes = new vis.DataSet(nodes);
        this.edges = new vis.DataSet(edges);
        this.options = options;
        this.initDraw();
    }

    private transformNode(node: VglNode): Edge {
        return null;
    }

}
