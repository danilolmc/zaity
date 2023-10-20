import { io } from "socket.io-client";

/**
 * Waits for a specific WebSocket event from the server and emits an event with transcribed text.
 *
 * @param {SocketIOClient.Socket} socket - The client's Socket.io instance.
 * @param {string} eventName - The name of the event to wait for from the server.
 * @param {string} transcribedText - The text to be transcribed and sent to the server.
 * @returns {Promise<any>} A Promise that resolves with the content of the received event.
 */
function waitForWebSocketEvent(socket, eventName, transcribedText) {
  return new Promise(resolve => {
    // Set up a listener for the specified event from the server
    socket.on(eventName, receivedData => {
      resolve(receivedData);
    });

    // Emit an event to the server with the provided transcribed text
    socket.emit(eventName, transcribedText);
  });
}

/**
 * Translates text using the client's WebSocket.
 *
 * @param {string} websocketEndpoint - WebSocket endpoint URL.
 * @param {string} transcribedText - Text to be translated.
 * @param {string} eventName - Event name for communication.
 * @returns {Promise<any>} A Promise that resolves with the translation received from the server.
 */
export async function translate_client(websocketEndpoint, transcribedText, eventName) {
  // Create an instance of the client's Socket.io.
  const clientIO = io(websocketEndpoint);

  // Wait for receiving the translation from the server.
  const translation = await waitForWebSocketEvent(clientIO, eventName, transcribedText);

  // Return the translation received from the server.
  return translation;
}
