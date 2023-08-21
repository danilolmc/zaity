import { StartTranscriptionJobCommand, StartTranscriptionJobCommandInput, TranscribeClient } from "@aws-sdk/client-transcribe";

/**
 * Creates a transcriber for transcription services.
 * @param {object} credentials - The authentication credentials for the transcription service.
 * @returns {object} - An object containing methods for configuration and transcription.
 */
export function Transcriber(credentials) {
  let transribeClient;
  let jobParams;

  /**
   * Configures the authentication credentials for the transcription client.
   * @param {object} credentials - The authentication credentials for the transcription service.
   * @returns {void}
   */
  function config(credentials) {
    transribeClient = new TranscribeClient(credentials);
  }

  /**
  * Sets the parameters of the transcription job.
  *
  * @param {StartTranscriptionJobCommandInput} params - The parameters of the transcription job.
  * @returns {void}
  */
  function setJobParams(params) {
    jobParams = params;
  }

  /**
   * Initiates the transcription process.
   * @param {function} success - Callback called when transcription is successful.
   * @param {function} error - Callback called in case of transcription error.
   * @throws {Error} - Throws an error if the parameters of the transcription job are not defined.
   * @returns {void}
   */
  function transcribe(success, error) {
    if (!jobParams) {
      throw new Error('Params not set, check out missing job params or credentials.');
    }

    const command = new StartTranscriptionJobCommand(jobParams);

    transribeClient.send(command)
      .then((data) => {
        success(data);
      }).catch((err) => {
        error(err);
      });
  }

  // Configure the transcriber if credentials are provided
  if (credentials) {
    config(credentials);
  }

  // Return an object with configured methods
  return {
    setJobParams,
    transcribe
  };
}

export default Transcriber;
