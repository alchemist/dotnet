import {ITypeData} from "./itype-data";

export class TypeDataWithImplementation implements ITypeData {
    constructor(public name = "", public namespace = "", public implementationType: ITypeData = null, public metadata = {}) {
    }
}