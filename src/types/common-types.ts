import {TypeData} from "../models/types/type-data";

export const unknownType = new TypeData("...");

export const commonTypes = {
    int: new TypeData("int", "System", {isValueType: true}),
    float: new TypeData("float", "System", {isValueType: true}),
    bool: new TypeData("bool", "System", {isValueType: true}),
    string: new TypeData("string", "System"),
    byte: new TypeData("byte", "System", {isValueType: true}),
    double: new TypeData("double", "System", {isValueType: true}),
    short: new TypeData("short", "System", {isValueType: true}),
    long: new TypeData("long", "System", {isValueType: true}),
    guid: new TypeData("Guid", "System"),
    dateTime: new TypeData("DateTime", "System"),
    timeSpan: new TypeData("TimeSpan", "System")
};

export const commonTypeList = Object.values(commonTypes);