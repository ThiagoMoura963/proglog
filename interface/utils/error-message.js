export default function createErrorMessage(
  responseBody,
  { omitAction = false } = {},
) {
  const { message, action } = responseBody || {};

  console.log(message);
  console.log(action);

  const errorMessages = [];

  if (message) {
    errorMessages.push(message);
  }

  if (action && !omitAction) {
    errorMessages.push(action);
  }

  console.log(errorMessages);

  return (
    errorMessages.join(" ") || "Erro desconhecido. Tente novamente mais tarde."
  );
}
