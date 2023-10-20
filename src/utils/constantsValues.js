/**
 * Constantes de erros permissão de acesso ao microfone
 * @readonly
 * @enum {string}
 */
export const CONSTANTS_MIC_PERMISSION = Object.freeze({
    /**
     * Tipo do erro quando a permissão é negada.
     */
    DENIED_PERMISSION_ERROR: 'not-allowed',
    /**
     * Mensagem do erro quando a permissão é negada.
     */
    DENIED_PERMISSION_MESSAGE: 'The access permition to microfone has been denied by the user',
    /**
     * Nome do erro quando a permissão ao microfone do usuário é negada.
     */
    DENIED_MIC_PERMISSION_ERROR_NAME: 'Denied Microphone Permission',
  });
  


  /**
 * Constantes de erros relacionados ao módulo de comando de voz 
 * @readonly
 * @enum {string}
 */
export const CONSTANTS_VOICE_COMMAND = Object.freeze({
    /**
     * Tipo do erro quando o comando de voz do usuário não é reconhecido.
     */
    COMMAND_VOICE_NOT_FOUND_ERROR: 'command-not-found',
    /**
     * Mensage do erro quando o comando de voz do usuário não é reconhecido.
     */
    COMMAND_VOICE_NOT_FOUND_MESSAGE: command => `Voice command '${command}' respective callback was not found`,
    /**
     * Nome do erro quando o comando de voz do usuário não é reconhecido.
     */
    COMMAND_VOICE_NOT_FOUND_ERROR_NAME: 'Voice command did not found',
    /**
     * Tipo do erro quando o tipo callback do comando de voz é invalido 
     */
    COMMAND_VOICE_INVALID_CALLBACK_TYPE_ERROR: callbackTypeName => 'invalid-voice-command-callback-type',
    /**
     * Mensagem do erro quando o tipo callback do comando de voz é invalido
     */
    COMMAND_VOICE_INVALID_CALLBACK_TYPE_ERROR_MESSAGE: callbackTypeName => `Invalid voice command callback type, it should be a ${callbackTypeName || 'function'}`,
    /**
     * Nome do erro quando o tipo callback do comando de voz é invalido
     */
    COMMAND_VOICE_INVALID_CALLBACK_TYPE_ERROR_NAME: callbackTypeName => 'Voice command callback type is invalid'
    
  });
  

  /**
 * Constantes de erros permissão de acesso ao microfone
 * @readonly
 * @enum {string}
 */
export const CONSTANTS_RECOGNITION = Object.freeze({
    /**
     * Tipo do erro quando a permissão é negada.
     */
    RECOGNITION_INVALID_CALLBACK_TYPE_ERROR: 'invalid-callback-type',
    /**
     * Mensagem do erro quando a permissão é negada.
     */
    RECOGNITION_INVALID_CALLBACK_TYPE_ERROR_MESSAGE: callbackTypeName => `Invalid callback type, it should be a ${callbackTypeName}`,
    /**
     * Nome do erro quando a permissão ao microfone do usuário é negada.
     */
    RECOGNITION_INVALID_CALLBACK_TYPE_ERROR_NAME: 'Invalid callback type',
  });
  