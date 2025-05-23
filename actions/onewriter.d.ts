// https://1writerapp.com/docs/js

interface Editor {
  /**
   * Returns the range of the current selection in the editor.
   * The returned value is an array of two integer values, contains the positions of the first and last characters.
   * @example
   * ```js
   * const range = editor.getSelectedRange(); //value of range is [5, 10]
   * ```
   */
  getSelectedRange(): [start: number, end: number];

  /**
   * Selects a range of text in the editor.
   * You can move the caret by setting the {@link start} parameter to the position where you want the caret to move to and omit the {@link end} parameter.
   * @param start The position of the first character.
   * @param end The position of the last character.
   * @example
   * ```js
   * editor.setSelectedRange(10, 15);
   * editor.setSelectedRange(20);
   * ```
   */
  setSelectedRange(start: number, end?: number): void;

  /**
   * Returns the range of lines that includes the current selection.
   */
  getSelectedLineRange(): [start: number, end: number];

  /**
   * Returns the current selected text in the editor.
   */
  getSelectedText(): string | null;

  /**
   * Returns the text in the given range.
   * @param start The position of the first character.
   * @param end The position of the last character.
   */
  getTextInRange(start: number, end: number): string;

  /**
   * Replaces the text in the given range with {@link replacement}.
   * @param start The position of the first character.
   * @param end The position of the last character.
   * @param replacement The text that replaces the text between {@link start} and {@link end}.
   */
  replaceTextInRange(start: number, end: number, replacement: string): void;

  /**
   * Replaces the text in the current selection with {@link replacement}.
   * @param replacement *The text that replaces the text in the current selection.
   */
  replaceSelection(replacement: string): void;

  /**
   * Returns the entire text in the editor.
   */
  getText(): string;

  /**
   * Replaces the entire text in the editor with {@link text}.
   * @param text The text that replaces the entire text in the editor.
   */
  setText(text: string): void;

  /**
   * Returns the folder path of the file that is currently opened in the editor.
   */
  getFolderPath(): string;

  /**
   * Returns the name of the file that is currently opened in the editor.
   */
  getFileName(): string;

  /**
   * Returns an array of to-do items in the file that is currently opened in the editor. Each element in the array is an array that contains the title and status of the to-do item.
   * @param completed Indicates status of the to-do items will be returned. If this parameter is omitted, all to-do items will be returned.
   * @example
   * ```js
   * const allTodos = editor.getTodos();
   * const result = [];
   * for (const [title, status] of allTodos) {
   *     result.push(formatString('{0} - {1}', title, status));
   * }
   * ui.alert(result.join('\n'));
   * ```
   */
  getTodos(completed?: string): [title: string, status: string][];

  /**
   * Creates a new file with the given {@link text} and {@link name}.
   * @param text Initial text for the new file.
   * @param name Name for the new file.
   * @param callback 1Writer creates and opens file asynchronously. This function will be executed when the file has been opened.
   */
  newFile(text?: string, name?: string, callback?: () => void): void;

  /**
   * Opens an existing file.
   * @param path The path to the file to be opened.
   * @param mode Valid values are edit and preview. If this parameter is omitted, file will be opened in the preferred mode specified in the app settings.
   * @param callback 1Writer opens file asynchronously. This function will be executed when the file has been opened.
   * @example
   * ```js
   * editor.openFile('Dropbox/Documents/Notes.txt');
   * ```
   */
  openFile(
    path: string,
    mode?: "edit" | "preview",
    callback?: () => void,
  ): void;

  /**
   * Closes the file that is currently opened in the editor.
   */
  close(): void;

  /**
   * Returns a boolean indicating whether a file is currently opened in the editor.
   */
  isClosed(): boolean;
}

/**
 * This object contains methods for interacting with 1Writer's text editor.
 */
declare const editor: Editor;

interface App {
  /**
   * Opens a URL, returns true if the URL was successfully opened; otherwise false.
   * @param url The URL to be opened.
   * @example
   * ```js
   * app.openURL('https://apple.com'); //open apple.com in Safari
   * ```
   */
  openURL(url: string): boolean;

  /**
   * Returns a boolean indicating whether the app is in dark mode.
   */
  inDarkMode(): boolean;

  /**
   * Toggles dark mode.
   */
  toggleDarkMode(): void;

  /**
   * Returns the Clipboard contents.
   */
  getClipboard(): string | null;

  /**
   * Replaces the contents of the Clipboard with {@link text} .
   * @param text The text to place on the Clipboard.
   */
  setClipboard(text: string): void;
}

/**
 * This object contains methods for interacting with the app.
 */
declare const app: App;

interface UI {
  /**
   * Shows an alert dialog.
   * @param message The message to display.
   * @param callback A function that will be executed when the dialog is closed.
   */
  alert(message: string, callback?: () => void): void;

  /**
   * Shows a confirmation dialog.
   * @param message The message to display.
   * @param callback A function that will be executed with the user's choice. true for OK, false for Cancel.
   */
  confirm(message: string, callback?: (result: boolean) => void): void;

  /**
   * Shows a prompt dialog.
   * @param message The message to display.
   * @param defaultValue The default value for the input field.
   * @param callback A function that will be executed with the user's input. null if cancelled.
   */
  prompt(
    message: string,
    defaultValue?: string,
    callback?: (result: string | null) => void,
  ): void;

  /**
   * Shows a custom HTML dialog.
   * @param html The HTML content to display.
   * @param callback A function that will be executed when the dialog is closed.
   */
  showDialog(html: string, callback?: () => void): void;
}

/**
 * This object contains methods for interacting with the user.
 */
declare const ui: UI;

interface HTTP {
  /**
   * Performs a HTTP request.
   * @param options A set of key/value pairs that configure the request.
   * @param callback The function to execute when the request completes.
   */
  request(
    options: {
      url: string;
      type?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
      data?: object;
      headers?: Record<string, string>;
      username?: string;
      password?: string;
    },
    callback?: (data: object, error?: [number, string]) => void,
  ): void;

  /**
   * Performs a HTTP GET request.
   * @param url The URL to which the request is sent.
   * @param data The data to be sent to the server.
   * @param callback The function to execute when the request completes.
   */
  get(
    url: string,
    data?: object,
    callback?: (data: object, error?: [number, string]) => void,
  ): void;

  /**
   * Performs a HTTP POST request.
   * @param url The URL to which the request is sent.
   * @param data The data to be sent to the server.
   * @param callback The function to execute when the request completes.
   */
  post(
    url: string,
    data?: object,
    callback?: (data: object, error?: [number, string]) => void,
  ): void;
}

/**
 * This object contains methods for performing HTTP requests.
 */
declare const http: HTTP;

interface WebBrowser {
  /**
   * Navigates to a URL.
   * @param url The URL to be opened.
   */
  open(url: string): void;

  /**
   * Sets the webpage contents.
   * @param html The HTML string to use as the contents of the webpage.
   */
  loadHTML(html: string): void;

  /**
   * Returns the webpage URL.
   */
  getURL(): string;

  /**
   * Returns the webpage title.
   */
  getTitle(): string;
}

/**
 * This object contains methods for interacting with the in-app web browser.
 */
declare const webBrowser: WebBrowser;
