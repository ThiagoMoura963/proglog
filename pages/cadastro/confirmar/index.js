import { MailIcon } from "@primer/octicons-react";
import { Blankslate } from "@primer/react/experimental";

import DefaultLayout from "interface/DefaultLayout/index.js";

export default function ConfirmRegisterPage() {
  return (
    <DefaultLayout>
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
