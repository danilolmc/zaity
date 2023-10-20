import { CONSTANTS_RECOGNITION } from "../utils/constantsValues";

export class InvalidRecognitionCallbackType extends Error{

    constructor(message){
        super(message);
        this.name = CONSTANTS_RECOGNITION.RECOGNITION_INVALID_CALLBACK_TYPE_ERROR_NAME
    }
}