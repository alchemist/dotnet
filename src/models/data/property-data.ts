import {TypeData} from "@/models/types/type-data";
import {required, withDisplayName} from "@treacherous/decorators";

export class PropertyData {
    @required()
    @withDisplayName("Property Name")
    public name: string;

    constructor(name = "", public type = new TypeData(), public isCollection = false) {
        this.name = name;
    }
}