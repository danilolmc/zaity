import { io } from "socket.io-client";

/**
 * Waits for a WebSocket event.
 *
 * @param {SocketIOClient.Socket} socket - Client's Socket.io instance.
 * @param {string} eventName - Name of the event to wait for.
 * @returns {Promise<any>} A Promise that resolves with the event's content.
 */
function waitForWebSocketEvent(socket, eventName) {
  return new Promise(resolve => {
    socket.on(eventName, translation => {
      resolve(translation);
    });
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
  const translation = await waitForWebSocketEvent(clientIO, eventName);

  // Send the transcribed text to the server.
  clientIO.emit(eventName, transcribedText);

  // Return the translation received from the server.
  return translation;
}
