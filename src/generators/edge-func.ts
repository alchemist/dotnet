console.log("LOADING EDGE");
const {func} = require("electron-edge-js");
console.log("LOADED EDGE");

export const funcP = (codeOrDescriptor: any) => {
    console.log("STARTING FUNC");
    const handle = func(codeOrDescriptor);
    return (data?: any) : Promise<any> => {
        return new Promise((resolve, reject) => {
            handle(data, function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    }
};