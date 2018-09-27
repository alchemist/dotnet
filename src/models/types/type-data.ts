import {ITypeData} from "./itype-data";
import {required, withDisplayName} from "@treacherous/decorators";

export class TypeData implements ITypeData {

    @required()
    @withDisplayName("Type Name")
    public name = "";

    @required()
    @withDisplayName("Type Namespace")
    public namespace = "";

    constructor(name = "", containingNamespace = "", public metadata = {}) {
        this.name = name;
        this.namespace = containingNamespace;
    }
}