import { VoiceCommandNotFound } from "../../error/commandNotFound";
import { DeniedMicPermission } from "../../error/deniedPermission";
import { InvalidVoiceCommandCallbackType } from "../../error/invalidVoiceCommandCallbackType";
import { applyMiddlewares } from "../../utils/applyMiddlewares";
import { buildSpeechRecognition } from "../../utils/builders/speechRecognitionBuilder";
import { CONSTANTS_MIC_PERMISSION, CONSTANTS_VOICE_COMMAND } from "../../utils/constantsValues";
import { debounce } from "../../utils/debounce";

/**
 * Module for giving voice command to the browser.
 *
 * @module VoiceCommand
 * @param {Object} commandParams - Configuration parameters for VoiceCommand.
 * @param {boolean} [commandParams.continuous=true] - Specifies if the listening should be continuous.
 * @param {string} [commandParams.lang='pt-BR'] - Specifies the language for recognize the command.
 * @param {Function} [commandParams.onError] - Callback function to be called when command recognition throw an error.
 * @param {Map<string, Function>} [commandParams.commandsMapping] - Map of the respective commands and callback functions.
 * @param {Array<Function>} [commandParams.middlewares] - Array of middleware functions to apply to the recognized command before invoke respective callback function.
 * @param {number} [commandParams.DEBOUNCE_DELAY=50] - The delay (in milliseconds) to debounce voice commands.
 * @param {boolean} [commandParams.keepListening=true] - Whether to keep listening for voice commands after each execution.
 * @throws {VoiceCommandNotFound} - Throws an error in case respective voice command it's not founded.
 * @throws {InvalidVoiceCommandCallbackType} Throws an error if the command callback type is invalid.
 * @throws {Error} - Throws an error if the browser does not support the Speech Recognition API.
 * @returns {{ listenVoiceCommand: Function, stopListening: Function }}
 */
export function VoiceCommand(commandParams) {

    let recognitionInstance;

    let {
        continuous = true,
        lang = 'pt-BR',
        commandsMapping,
        DEBOUNCE_DELAY = 50,
        keepListening = true,
        onError = _ => { },
        middlewares = []
    } = commandParams;

    /**
     * Creates a new instance of SpeechRecognition with the specified configuration.
     */
    function createInstance() {

        recognitionInstance = buildSpeechRecognition();

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
            throw new VoiceCommandNotFound(CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_NOT_FOUND_MESSAGE(voiceCommand));
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
            throw new InvalidVoiceCommandCallbackType(CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_INVALID_CALLBACK_TYPE_ERROR_MESSAGE(typeof commandCallback))
        }
    }

    /**
     * Initiates voice recognition for getting user voice command.
     *
     * @throws {Error} - Throws an error if the browser does not support the Speech Recognition API.
     * @throws {InvalidVoiceCommandCallbackType} Throws an error if the command callback type is invalid.
     * @param {Object} options - Configuration options for voice recognition.
     * @param {Function} [options.onEnd=() => {}] - A callback function to be executed when listening ends.
     * @param {Function} [options.onStart=() => {}] - A callback function to be executed when listening starts.
     * @returns {void}
     */
    function listenVoiceCommand({
        onEnd = () => { },
        onStart = () => { }
    }) {
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
            if (event.error === CONSTANTS_MIC_PERMISSION.DENIED_PERMISSION_ERROR) {
                onError(new DeniedMicPermission(CONSTANTS_MIC_PERMISSION.DENIED_PERMISSION_MESSAGE));
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