import { StartTranscriptionJobCommand, StartTranscriptionJobCommandOutput, TranscribeClient, TranscribeClientConfig, StartTranscriptionJobRequest } from "@aws-sdk/client-transcribe";
import { AWSSetJobParams, AWSTranscriptionError, AWSTranscriptionSuccess } from "src/interfaces/aws/transcribe";
import { Transcriber } from "src/interfaces/transcriber";


export class AWSTranscriber implements Transcriber, AWSSetJobParams {

    private jobParams!: StartTranscriptionJobRequest;
    private transribeClient!: TranscribeClient;

    constructor(credentials: TranscribeClientConfig) {
        if (credentials) this.config(credentials);
    }

    private config(credentials: TranscribeClientConfig) {
        this.transribeClient = new TranscribeClient(credentials);
    }

    setJobParams(jobParams: StartTranscriptionJobRequest) {
        this.jobParams = jobParams;
    }

    transcribe(success: AWSTranscriptionSuccess, error: AWSTranscriptionError) {
        if (!this.jobParams) throw new Error('Params not set, are you missing TranscribeConfig or StartTranscriptionJobRequest?');

        const command = new StartTranscriptionJobCommand(this.jobParams);

        this.transribeClient.send(command)
            .then((data: StartTranscriptionJobCommandOutput) => {
                success(data);
            }).catch((err: any) => {
                error(err);
            })
    }
}