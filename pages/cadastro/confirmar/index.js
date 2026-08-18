import { MailIcon } from "@primer/octicons-react";
import { Blankslate } from "@primer/react/experimental";

import DefaultLayout from "interface/DefaultLayout/index.js";

export default function ConfirmRegisterPage() {
  return (
    <DefaultLayout
      metadata={{
        title: "Login",
        description:
          "Enviamos um email de confirmação. Acesse sua caixa de entrada e clique no link para ativar sua conta.",
      }}
    >
      <Blankslate spacious>
        <Blankslate.Visual>
          <MailIcon size="medium" />
        </Blankslate.Visual>
        <Blankslate.Heading>Confirme seu cadastro</Blankslate.Heading>
        <Blankslate.Description>
          Enviamos um e-mail de confirmação para você.
        </Blankslate.Description>
      </Blankslate>
    </DefaultLayout>
  );
}
