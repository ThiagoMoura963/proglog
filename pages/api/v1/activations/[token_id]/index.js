import controller from "infra/controller.js";
import activation from "models/activation";
import authorization from "models/authorization.js";
import validator from "models/validator.js";
import { createRouter } from "next-connect";

export default createRouter()
  .use(controller.injectAnonymousOrUser)
  .patch(controller.canRequest("read:activation_token"), patchHandler)
  .handler(controller.errorHandlers);

async function patchHandler(request, response) {
  const userTryingToPatch = request.context.user;
  const cleanValues = validator(request.query, {
    token_id: true,
  });

  const validActivationToken = await activation.findOneValidById(
    cleanValues.token_id,
  );

  await activation.activateUserByUserId(validActivationToken.user_id);

  const usedActivationToken = await activation.markTokenAsUsed(
    cleanValues.token_id,
  );

  const secureOutputValues = authorization.filterOutput(
    userTryingToPatch,
    "read:activation_token",
    usedActivationToken,
  );

  return response.status(200).json(secureOutputValues);
}
