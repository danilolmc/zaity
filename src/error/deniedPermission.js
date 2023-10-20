import { CONSTANTS_MIC_PERMISSION } from "../utils/constantsValues";

export class DeniedMicPermission extends Error {

    constructor(message){
        super(message);
        this.name = CONSTANTS_MIC_PERMISSION.DENIED_MIC_PERMISSION_ERROR_NAME
    }
}