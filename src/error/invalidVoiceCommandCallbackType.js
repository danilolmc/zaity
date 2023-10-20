import { CONSTANTS_VOICE_COMMAND } from "../utils/constantsValues";

export class InvalidVoiceCommandCallbackType extends Error{

    constructor(message){
        super(message);
        this.name = CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_INVALID_CALLBACK_TYPE_ERROR_NAME
    }
}