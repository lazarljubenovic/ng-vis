/* tslint:disable:no-unused-variable */

import {TestBed, inject} from "@angular/core/testing";
import {VisNetworkService} from "./vis-network.service";
import {VisNgNetworkNode} from "./interfaces/vis-ng-network-node.interface";

describe('Service: VisGraph', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VisNetworkService]
        });
    });

    it('should ...', inject([VisNetworkService], (service: VisNetworkService) => {
        expect(service).toBeTruthy();
    }));

    describe(`Diff function `, () => {
        describe(`Nodes`, () => {
            const oldValue: VisNgNetworkNode[] = [
                {id: 0, label: 'node-0'},
                {id: 1, label: 'node-1'},
                {id: 2, label: 'node-2'},
            ];

            it(`should add new values`, inject([VisNetworkService], (service: VisNetworkService) => {
                const addedElements: VisNgNetworkNode[] = [{id: 3, label: 'node-2'}];
                const addNewValues: VisNgNetworkNode[] = oldValue.concat(addedElements);
                expect(service.diff(oldValue, addNewValues).added).toEqual(addedElements);
                expect(service.diff(oldValue, addNewValues).deleted).toEqual([]);
                expect(service.diff(oldValue, addNewValues).changed).toEqual([]);
            }));

            it(`should delete values`, inject([VisNetworkService], (service: VisNetworkService) => {
                const deletedElements: number[] = [0];
                const deleteNewValues: VisNgNetworkNode[] = oldValue.slice(1);
                expect(service.diff(oldValue, deleteNewValues).deleted).toEqual(deletedElements);
                expect(service.diff(oldValue, deleteNewValues).added).toEqual([]);
                expect(service.diff(oldValue, deleteNewValues).changed).toEqual([]);
            }));

            it(`should change values`, inject([VisNetworkService], (service: VisNetworkService) => {
                const changedElements: VisNgNetworkNode[] = [{id: 1, label: 'node-1.1'}];
                const changeNewValues: VisNgNetworkNode[] = [
                    {id: 0, label: 'node-0'},
                    {id: 1, label: 'node-1.1'},
                    {id: 2, label: 'node-2'}
                ];
                expect(service.diff(oldValue, changeNewValues).changed).toEqual(changedElements);
                expect(service.diff(oldValue, changeNewValues).deleted).toEqual([]);
                expect(service.diff(oldValue, changeNewValues).added).toEqual([]);
            }));

        });

        describe(`Edges`, () => {

        })
    })
});
