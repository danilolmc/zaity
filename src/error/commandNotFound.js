import { CONSTANTS_VOICE_COMMAND } from "../utils/constantsValues";

export class VoiceCommandNotFound extends Error{
    constructo(message){
        super(message);
        this.name = CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_NOT_FOUND_ERROR_NAME
    }
}