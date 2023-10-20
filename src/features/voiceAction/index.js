import { VoiceCommandNotFound, voiceCommandNotFound } from "../../error/commandNotFound";
import { InvalidVoiceCommandCallbackType } from "../../error/invalidVoiceCommandCallbackType";
import { checkSpeechRecognitionSupport } from "../../utils/IsSpeechRecognitionSupported";
import { applyMiddlewares } from "../../utils/applyMiddlewares";
import { CONSTANTS, CONSTANTS_VOICE_COMMAND } from "../../utils/constantsValues";
import { checkEnvironmentSupport } from "../../utils/isBrowserEnv";


/**
 * Module for giving voice commando to the browser.
 *
 * @module VoiceCommand
 * @param {Object} commandParams - Configuration parameters for VoiceCommand.
 * @param {boolean} [commandParams.continuous=true] - Specifies if the listening should be continuous.
 * @param {string} [commandParams.lang='pt-BR'] - Specifies the language for recognize the command.
 * @param {Function} [commandParams.onError] - Callback function to be called when command recognition throw an error.
 * @param {Map<string, Function>} [commandParams.commandsMapping] - Map of the respective commands and callback functions.
 * @param {Array<Function>} [commandParams.middlewares] - Array of middleware functions to apply to the recognized command before invoke respective callback function.
 * @throws {VoiceCommandNotFound} - Throws an error in case respective voice command it's not founded.
 * @throws {InvalidVoiceCommandCallbackType} Throws an error if the command callback type is invalid.
 * @throws {Error} - Throws an error if the browser does not support the Speech Recognition API.
 * @returns {Object} - VoiceCommand module.
 */
export function VoiceCommand(commandParams) {

    let recognitionInstance;

    const {
        continuous = true,
        lang = 'pt-BR',
        DEBOUNCE_DELAY = 50,
        keepListening = true,
        commandsMapping,
        onEnd = () => { },
        onStart = () => { },
        onError = _ => { },
        middlewares = []
    } = commandParams;

    /**
     * Creates a new instance of SpeechRecognition with the specified configuration.
     */
    function createInstance() {

        recognitionInstance = new SpeechRecognition();

        recognitionInstance.continuous = continuous;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = lang;
    }

    /**
     * Look up for respective voice command inside commandsPapping.
     *
     * @param {string} voiceCommand - User voice command.
     * @throws {VoiceCommandNotFound} - Throws an error in case respective voice command it's not founded.
     * @returns {Function|undefined}
     */
    function findCommand(voiceCommand) {
        if (!commandsMapping.has(voiceCommand)) {
            throw new VoiceCommandNotFound(CONSTANTS.COMMAND_VOICE_NOT_FOUND_MESSAGE); 
        }

        return commandsMapping.get(voiceCommand)
    }

    /**
     * Checks the callback operation type.
     *
     * @param {Function|HTMLElement} commandCallback - The callback command operation to be checked.
     * @throws {InvalidRecognitionCallbackType} Throws an error if the callback operation type is invalid.
     */
    function checkCallbackOperationType(commandCallback) {
        if (!(commandCallback instanceof Function)) {
            throw new InvalidVoiceCommandCallbackType(CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_INVALID_CALLBACK_TYPE_ERROR_MESSAGE)
        }
    }

    /**
     * Initiates voice recognition for getting user voice command.
     *
     * @param {Function} commandCallback - Callback function.
     * @throws {Error} - Throws an error if the browser does not support the Speech Recognition API.
     * @throws {InvalidVoiceCommandCallbackType} Throws an error if the command callback type is invalid.
     * @returns {void}
     */
    function listenVoiceCommand() {
        checkEnvironmentSupport();
        checkSpeechRecognitionSupport();
        createInstance();

        recognitionInstance.onresult = event => {
            const result = applyMiddlewares(event.results[event.results.length - 1][0].transcript, middlewares);

            const commandCallback = findCommand(result);
            checkCallbackOperationType(commandCallback);

            const debouncedFunction = debounce(commandCallback, DEBOUNCE_DELAY);

            debouncedFunction(result);
        };

        recognitionInstance.onstart = () => {
            onStart();
        };

        recognitionInstance.onerror = event => {
            if (event.error === CONSTANTS.DENIED_PERMISSION_ERROR) {
                onError(new DeniedMicPermission(CONSTANTS.DENIED_PERMISSION_MESSAGE));
                return;
            }
            onError(event.error)
        };

        recognitionInstance.onend = () => {
            if (keepListening) recognitionInstance.start();
            onEnd();
        };

        recognitionInstance.start();
    }

    /**
     * Stops listening for speech.
     *
     * @returns {void}
     */
    function stopListening() {
        keepListening = false;
        recognitionInstance.stop();
    }

    return {
        listenVoiceCommand,
        stopListening
    };

}       