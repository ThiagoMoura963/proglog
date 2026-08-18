import DefaultLayout from "interface/DefaultLayout/index.js";
import FormField from "interface/FormField/index.js";
import { createErrorMessage } from "interface/index.js";

import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button, Heading, Stack, TextInput, Banner } from "@primer/react";
import { EyeIcon, EyeClosedIcon } from "@primer/octicons-react";

export default function RegisterPage() {
  return (
    <DefaultLayout
      contentWidth="small"
      metadata={{
        title: "Cadastro",
        description: "Crie sua conta de forma gratuita.",
      }}
    >
      <Stack gap="spacious">
        <Heading as="h1" style={{ textAlign: "center" }}>
          Cadastro
        </Heading>
        <RegisterForm />
      </Stack>
    </DefaultLayout>
  );
}

function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalMessage, setGlobalMessage] = useState(null);

  const KNOW_FIELDS = ["username", "email", "password"];

  const passwordInputRef = useRef(null);

  function focusAfterEnd() {
    setTimeout(() => {
      const input = passwordInputRef.current;
      const len = input.value.length;
      input.focus();
      input.setSelectionRange(len, len);
    });
  }

  function handleTogglePassword(event) {
    event.preventDefault();
    setShowPassword((prev) => !prev);
    focusAfterEnd();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const requestBody = { username, email, password };
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseBody = await response.json();

      if (response.status === 201) {
        localStorage.setItem("registrationEmail", email);
        await router.push("/cadastro/confirmar");
        return;
      }

      if (response.status === 400 && KNOW_FIELDS.includes(responseBody.key)) {
        setFieldErrors({
          [responseBody.key]: createErrorMessage(responseBody, {
            omitAction: true,
          }),
        });
      } else {
        setGlobalMessage(createErrorMessage(responseBody));
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="normal">
        <FormField
          label="Nome de usuário"
          size="large"
          autoComplete="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={fieldErrors.username}
        />

        <FormField
          label="Email"
          size="large"
          autoComplete="email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={fieldErrors.email}
        />

        <FormField
          ref={passwordInputRef}
          label="Senha"
          size="large"
          type={showPassword ? "text" : "password"}
          value={password}
          autoComplete="new-password"
          onChange={(event) => setPassword(event.target.value)}
          error={fieldErrors.password}
          trailingAction={
            <TextInput.Action
              onClick={handleTogglePassword}
              icon={showPassword ? EyeIcon : EyeClosedIcon}
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            />
          }
        />

        {globalMessage && <Banner variant="critical" title={globalMessage} />}

        <Button
          block
          type="submit"
          variant="primary"
          size="large"
          disabled={isLoading}
          loading={isLoading}
        >
          Criar cadastro
        </Button>
      </Stack>
    </form>
  );
}
