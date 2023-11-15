<header>
    <p align="center">
        <img align="center" src="./logolibrary.svg" width="162px" style="max-width: 100%;">
    </p>
    <br/>
    <div align="center">
        <a href="./CONTRIBUTING.md">Contributing Guidelines</a>
        <a href="https://github.com/danilolmc/zaity/issues">Submit an issue</a>
    </div>
<header>

## Zaity

![npm](https://img.shields.io/npm/v/zaity-kit) [![Build](https://github.com/danilolmc/zaity/actions/workflows/build_release.yml/badge.svg)](https://github.com/danilolmc/zaity/actions/workflows/build_release.yml)

Zaity is a javascript library for creating voice based web user interfaces

The package contains a set of tools that helps to build voice based features in your web application, this way extending the tool set for
users with needs for accessibility resources interact with your application web experience, as its main tool this library includes: Realtime Voice Recognition, Voice Synthesizing, Voice based task execution and Audio/Video Transcription modules.

## Instalation

```javascript
npm install zaity-kit
```

## Usage

#### Voice Recognition

This module provides functionality to recognize and transcribe voice in realtime in the browser

```javascript
import { VoiceSynthesizer } from "zaity-kit/browser";

const voiceSynthesizer = VoiceSynthesizer({
  lang: "en-US",
  onError: (error) => {
    console.error("Voice synthesis error:", error);
  },
  middlewares: [
    (text) => {
      // Apply custom middleware right before synthesis result for customize it
      return text.replace("Hi", "Hello");
    },
  ],
});
voiceSynthesizer.speak("Hi, world!");
```

#### Voice Command

This module provides functionality to give voice commands to the browser, which can be bonded to a javascript code.

```javascript
import { VoiceCommand } from "zaity-kit/browser";

const voiceCommand = VoiceCommand({
  continuous: true,
  lang: "en-US",
  onError: (error) => {
    console.error("Voice command recognition error:", error);
  },
  commandsMapping: new Map([
    ["open", () => console.log("Opening something")],
    ["close", () => console.log("Closing something")],
  ]),
  middlewares: [
    (command) => {
      // Apply custom middleware before calling bonded command
      return command.toLowerCase();
    },
  ],
  DEBOUNCE_DELAY: 50,
  keepListening: true,
});

voiceCommand.listenVoiceCommand(
  () => console.log("Listening started..."),
  () => console.log("Listening stopped...")
);
```

#### Voice Synthesizer

This module provides functionality to synthesizing voice from the browser.

```javascript
import { VoiceSynthesizer } from "zaity-kit/browser";

const voiceSynthesizer = VoiceSynthesizer({
  lang: "en-US",
  onError: (error) => {
    console.error("Voice synthesis error:", error);
  },
  middlewares: [
    (text) => {
      // Apply a custom middleware right before synthesis result is returned
      return text.toUpperCase();
    },
  ],
});

voiceSynthesizer.speak("Hello, world!");
```

#### Voice Transcriber

This module provides the funcionality to transcribe audio/video files, powered by AWS, in a nodeJS environment.

```javascript
const transcriber = VoiceBatchTranscriber({
  // Provide your AWS credentials here
});

transcriber.setJobParams({
  // Provide transcription job parameters here
  TranscriptionJobName: "yourtranscriptionjob",
  LanguageCode: "en-US",
  Media: {
    MediaFileUri: "s3://your-bucket/your-audio-file.mp3",
  },
  OutputBucketName: "yourtranscriptionbucket",
});

transcriber.transcribe(
  (success) => console.log("Transcription successful:", success),
  (error) => console.error("Transcription error:", error)
);
```

## API Reference

#### Voice Recognition

**VoiceRecognition(params)**: Creates a new instance of the VoiceRecognition module.

- **params**: Configuration parameters for VoiceRecognition.

  - continuous (boolean) - Specifies if the recognition should be continuous.
  - interimResults (boolean) - Specifies if interim results should be provided.
  - lang (string) - Specifies the language for recognition, default **pt-BR**.
  - DEBOUNCE_DELAY (number) - Specifies the debounce delay for updates.
  - keepListening (boolean) - Specifies if recognition should keep listening after each end event.
  - onEnd (callback: Function) - Callback function to be called when recognition ends.
  - onStart (callback: Function) - Callback function to be called when recognition starts.
  - onError (callback: Function) - Callback function to be called when recognition throw an error.
  - middlewares (Array<Function>) - Array of middleware functions to apply to the transcript.

**Exceptions**

- Error - Throws an error if the browser or Speech Recognition API is not supported.
- InvalidRecognitionCallbackType - Throws an error if the callback operation type is invalid.

**Methods**

- **listen(callbackOperation: Function | HTMLElement)**: Start listening user audio input.

  ```javascript
  voiceRecognition.listen((result) => console.log(result));
  ```

- **stopListening()**: Stop speech listening of user voice input.

  ```javascript
  voiceSynthesizer.stopListening();
  ```

#### Voice Command

**VoiceCommand(commandParams)**: Creates a new instance of the VoiceCommand module.

- **commandParams**: Configuration parameters for VoiceCommand.

  - continuous (boolean, optional, default: true): Specifies if the listening should be continuous.
  - lang (string, optional, default: 'pt-BR'): Specifies the language for recognizing the command.
  - onError (function, optional): Callback function to be called when command recognition throws an error.
  - commandsMapping (Map, optional): Map of the respective commands and callback functions.
  - middlewares (Array<function>, optional): Array of middleware functions to apply to the recognized command before invoking the respective callback function.
  - DEBOUNCE_DELAY (number, optional, default: 50): The delay (in milliseconds) to debounce voice commands.
  - keepListening (boolean, optional, default: true): Whether to keep listening for voice commands after each execution.

**Exceptions**

- VoiceCommandNotFound: Throws an error in case the respective voice command is not found.
- InvalidVoiceCommandCallbackType: Throws an error if the command callback type is invalid.
- Error: Throws an error if the browser does not support the Speech Recognition API.

**Methods**

- listenVoiceCommand(onStart: function, onEnd: function): Starts listening for voice commands.

  ```javascript
  voiceCommand.listenVoiceCommand(
    () => console.log("Listening started..."),
    () => console.log("Listening stopped...")
  );
  ```

- **stopListening()**: Stops listening for voice commands.

  ```javascript
  voiceSynthesizer.stopListening();
  ```

#### VoiceSynthesizer

**VoiceSynthesizer(synthesisParams)**: Creates a new instance of the VoiceSynthesizer module.

- **synthesisParams**: Configuration object with parameters for VoiceSynthesizer.

  - lang (string): Specifies the output voice language, default is **pt-BR**.
  - onError (callback: Function): Optional callback function to be called when voice synthesis encounters an error.
  - middlewares (Array<Function>): Optional array of middleware functions to apply over the content which will be synthesized into voice.

**Exceptions**

- Error - Throws an error if the browser does not support the Speech Synthesis interface.
- InvalidLangCode - Throws an error when a voice for the specified language is not valid.

**Methods**

- **speak(text: string)**: Function returned by VoiceSynthesizer constructor to synthesize and speak the provided text.

  ```javascript
  voiceSynthesizer.speak("Hello, world!");
  ```

- **pauseSpeaking()**: Function returned by VoiceSynthesizer constructor to pause the currently ongoing voice synthesis.

  ```javascript
  voiceSynthesizer.pauseSpeaking();
  ```

- **resumeSpeaking()**: Function returned by VoiceSynthesizer constructor to resume the paused voice synthesis.

  ```javascript
  voiceSynthesizer.resumeSpeaking();
  ```

#### Voice Transcriber

**VoiceBatchTranscriber(credentials)**: Creates a new instance of the VoiceTranscription module.

- credentials (TranscribeClientConfig): The authentication credentials for the transcription service.

**Methods**

- **setJobParams(params: StartTranscriptionJobCommandInput)**: Sets transcription job params.

  ```javascript
  transcriber.setJobParams({
    Media: {
      MediaFileUri: "s3://your-bucket/your-audio-file.mp3",
    }
  }),
  ```

- **transcribe(success: Function, error: Function)**: Starts the transcribe job.

  ```javascript
  voiceSynthesizer.transcribe(
    () => console.log("It succeed"),
    () => console.log("Oops, something goes wrong!")
  );
  ```
