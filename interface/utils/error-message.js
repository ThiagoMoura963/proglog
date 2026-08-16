export default function createErrorMessage(
  responseBody,
  { omitAction = false } = {},
) {
  const { message, action } = responseBody || {};

  const errorMessages = [];

  if (message) {
    errorMessages.push(message);
  }

  if (action && !omitAction) {
    errorMessages.push(action);
  }

  return (
    errorMessages.join(" ") || "Erro desconhecido. Tente novamente mais tarde."
  );
}
