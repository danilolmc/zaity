import { InvalidLangCode } from "../../error/invalidLangCode";
import { applyMiddlewares } from "../../utils/applyMiddlewares";
import { buildSpeechSynthesis } from "../../utils/builders/speechSynthesisBuilder";
import { CONSTANTS_SYNTHESIS } from "../../utils/constantsValues";

/**
 * Module for syntetize voice from the browser.
 *
 * @module VoiceSynthesizer
 * @param {Object} syntesisParams - Configuration parameters for VoiceSynthesizer.
 * @param {string} [syntesisParams.lang='pt-BR'] - Specifies the output voice language.
 * @param {Function} [syntesisParams.onError] - Callback function to be called when command recognition throw an error.
 * @param {Array<Function>} [syntesisParams.middlewares] - Array of middleware functions to apply over the content wich will be syntetized a voice.
 * @throws {Error} - Throws an error if the browser does not support the Speech Synthesis interface.
 * @throws {InvalidLangCode} Throws an error when a voice for the specified language is not valid.
 * @returns {{
 *   speak: (text: string) => void,
 *   pauseSpeaking: () => void,
 *   resumeSpeaking: () => void
 * }}
 * 
 */
export function VoiceSynthesizer(syntesisParams) {
    /**
     * @type {SpeechSynthesis}
     */
    let speechSynthesisInstance;

    /**
    * @type {string}
    */
    let memoizedVoiceURI;

    const {
        lang = 'pt-BR',
        onError = () => { },
        middlewares = []
    } = syntesisParams;

    /**
     * Creates a new instance of SpeechSyntesis with the specified configuration.
     */
    function createInstance() {

        speechSynthesisInstance = buildSpeechSynthesis();
    }

    /**
     * Gets the available speech synthesis voices. Resolves with an array of voices.
     *
     * @returns {Promise<SpeechSynthesisVoice[]>} A Promise that resolves with an array of available voices.
     */
    function getVoices() {
        return new Promise((resolve) => {
            if (speechSynthesisInstance.getVoices().length !== 0) {
                resolve(speechSynthesisInstance.getVoices());
            } else {
                speechSynthesisInstance.onvoiceschanged = () => {
                    resolve(speechSynthesisInstance.getVoices());
                };
            }
        });
    }

    /**
     * Asynchronously retrieves a speech synthesis voice that matches the specified language.
     *
     * @param {string} lang - The language code for the desired voice.
     * @returns {Promise<SpeechSynthesisVoice>} A Promise that resolves with the found voice.
     * @throws {InvalidLangCode} Throws an error when a voice for the specified language is not found.
     */
    async function getVoice(lang) {
        const voices = await getVoices();

        let voice;

        const findVoiceByLangFn = (voice, langCode) => voice.lang == langCode;

        const findVoiceByURI = (voice, voiceURI) => voice.voiceURI == voiceURI;

        const findVoice = (findFn, searchParams) => voices.find(voice => findFn(voice, searchParams));

        if (!findVoice(findVoiceByLangFn, lang)) {
            throw new InvalidLangCode(CONSTANTS_SYNTHESIS.SYNTHESIS_INVALID_LANG_TYPE_ERROR_MESSAGE());
        }

        voice = memoizedVoiceURI ? findVoice(findVoiceByURI, memoizedVoiceURI) : findVoice(findVoiceByLangFn, lang);

        if (memoizedVoiceURI !== voice.voiceURI) {
            memoizedVoiceURI = voice.voiceURI;
        }

        return voice;
    }

    /**
    * Asynchronously prepares text for speech synthesis by applying middlewares and selecting a suitable voice.
    *
    * @param {string} text - The text to be prepared for speech synthesis.
    * @returns {Promise<SpeechSynthesisUtterance>} A Promise that resolves with a prepared SpeechSynthesisUtterance.
    */
    async function prepareText(text) {
        const newTextUtterance = new SpeechSynthesisUtterance(applyMiddlewares(text, middlewares));

        newTextUtterance.lang = lang;

        newTextUtterance.voice = await getVoice(lang);

        return newTextUtterance;
    }


    /**
     * Set an error event listener for a SpeechSynthesisUtterance.
     *
     * @param {SpeechSynthesisUtterance} utterance - The SpeechSynthesisUtterance object to which the error event listener will be attached.
     */
    function setOnError(utterance) {
        utterance.addEventListener('error', event => onError(event));
    }

    /**
     * Pauses the current speech synthesis process.
     */
    function pauseSpeaking() {
        speechSynthesisInstance.pause();
    }


    /**
     * Resumes a paused speech synthesis process.
     */
    function resumeSpeaking() {
        speechSynthesisInstance.resume();
    }


    async function speak(text) {
        createInstance();

        const newTextUtterance = await prepareText(text);

        setOnError(newTextUtterance)

        speechSynthesisInstance.speak(newTextUtterance);
    }


    return {
        speak,
        pauseSpeaking,
        resumeSpeaking
    }
}