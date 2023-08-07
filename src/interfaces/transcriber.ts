import { AWSTranscriptionError, AWSTranscriptionSuccess } from "./aws/transcribe";

export interface Transcriber { 
    transcribe(success: AWSTranscriptionSuccess, error: AWSTranscriptionError): any;
}
