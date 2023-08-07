import { StartTranscriptionJobRequest, StartTranscriptionJobCommandOutput } from '@aws-sdk/client-transcribe';

export interface AWSSetJobParams {
    setJobParams(jobParams: StartTranscriptionJobRequest): void
}

export type AWSTranscriptionError = (err: any) => void;
export type AWSTranscriptionSuccess = (data: StartTranscriptionJobCommandOutput) => void;
