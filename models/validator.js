import Joi from "joi";
import { ValidationError } from "infra/errors.js";

const cachedSchemas = {};

const defaultSchema = Joi.object().label("body").required().min(1).messages({
  "any.required": "{#label} é um campo obrigatório.",
  "object.base": "{#label} enviado deve ser do tipo Object.",
  "object.min": "Objeto enviado deve ter no mínimo uma chave.",
  "string.alphanum": "{#label} deve conter apenas caracteres alfanuméricos.",
  "string.base": "{#label} deve ser do tipo String.",
  "string.email": "{#label} deve conter um email válido.",
  "string.empty": "{#label} não pode estar em branco.",
  "string.length":
    '{#label} deve possuir {#limit} {if(#limit==1, "caractere", "caracteres")}.',
  "string.guid": "{#label} deve possuir um token UUID na versão 4.",
  "string.max":
    '{#label} deve conter no máximo {#limit} {if(#limit==1, "caractere", "caracteres")}.',
  "string.min":
    '{#label} deve conter no mínimo {#limit} {if(#limit==1, "caractere", "caracteres")}.',
});

const schemas = {
  token_id: Joi.string()
    .trim()
    .guid({
      version: "uuidv4",
      separator: "-",
      wrapper: false,
    })
    .required(),

  email: Joi.string().email().min(7).max(254).lowercase().trim().required(),

  password: Joi.string().min(8).max(72).trim().required(),

  username: Joi.string().alphanum().min(3).max(30).trim().required(),

  session_id: Joi.string().length(96).alphanum().required(),
};

export default function validator(object, keys) {
  try {
    object = JSON.parse(JSON.stringify(object));
  } catch {
    throw new ValidationError({
      message: "Não foi possível interpretar o valor enviado.",
      action: "Verifique se o valor enviado é um JSON válido.",
      key: "object",
    });
  }

  const keysString = Object.keys(keys).join(",");

  if (!cachedSchemas[keysString]) {
    let finalSchema = defaultSchema;

    for (const key of Object.keys(keys)) {
      finalSchema = finalSchema.concat(
        Joi.object({
          [key]: schemas[key],
        }),
      );
    }
    cachedSchemas[keysString] = finalSchema;
  }

  const { error, value } = cachedSchemas[keysString].validate(object, {
    stripUnknown: true,
  });

  if (error) {
    throw new ValidationError({
      message: error.details[0].message,
      key:
        error.details[0].context.key ||
        error.details[0].context.type ||
        "object",
    });
  }

  return value;
}
