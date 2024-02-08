import { describe, expect, test } from 'vitest';
import { VoiceCommandNotFound } from './commandNotFound';
import { CONSTANTS_VOICE_COMMAND } from '../../utils/constantsValues';

describe('Command not found error', () => {  

    test('should get voice command not found error with custom message', () => {
        
        const errorCustomMessage = "Voice command is not defined"
        const error = new VoiceCommandNotFound(errorCustomMessage);
        
        expect(error.message).toBe(errorCustomMessage);
        expect(error.name).toBe(CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_NOT_FOUND_ERROR_NAME);
    })
    
    test('should get voice command not found error with default message', () => {
        
        const error = new VoiceCommandNotFound();
        
        expect(error.message).toBe('Voice command not found');
        expect(error.name).toBe(CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_NOT_FOUND_ERROR_NAME);
    });
});