/* tslint:disable:no-unused-variable */

import {TestBed, inject} from "@angular/core/testing";
import {VisGraphService} from "./vis-graph.service";
import {VglNode} from "./node.interface";

describe('Service: VisGraph', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VisGraphService]
        });
    });

    it('should ...', inject([VisGraphService], (service: VisGraphService) => {
        expect(service).toBeTruthy();
    }));

    describe(`Diff function `, () => {
        describe(`Nodes`, () => {
            const oldValue: VglNode[] = [
                {id: 0, label: 'node-0'},
                {id: 1, label: 'node-1'},
                {id: 2, label: 'node-2'},
            ];

            it(`should add new values`, inject([VisGraphService], (service: VisGraphService) => {
                const addedElements: VglNode[] = [{id: 3, label: 'node-2'}];
                const addNewValues: VglNode[] = oldValue.concat(addedElements);
                expect(service.diff(oldValue, addNewValues).added).toEqual(addedElements);
                expect(service.diff(oldValue, addNewValues).deleted).toEqual([]);
                expect(service.diff(oldValue, addNewValues).changed).toEqual([]);
            }));

            it(`should delete values`, inject([VisGraphService], (service: VisGraphService) => {
                const deletedElements: number[] = [0];
                const deleteNewValues: VglNode[] = oldValue.slice(1);
                expect(service.diff(oldValue, deleteNewValues).deleted).toEqual(deletedElements);
                expect(service.diff(oldValue, deleteNewValues).added).toEqual([]);
                expect(service.diff(oldValue, deleteNewValues).changed).toEqual([]);
            }));

            it(`should change values`, inject([VisGraphService], (service: VisGraphService) => {
                const changedElements: VglNode[] = [{id: 1, label: 'node-1.1'}];
                const changeNewValues: VglNode[] = [
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
