const defaultHandler = (error: Error) => console.error(error.message);

export function handleError(error: Error, handler = defaultHandler) {
  handler(error);
}
