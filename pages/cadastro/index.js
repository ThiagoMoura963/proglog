import DefaultLayout from "pages/interface/DefaultLayout/index.js";
import FormField from "pages/interface/FormField/index.js";

import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button, Heading, Stack, TextInput } from "@primer/react";
import { EyeIcon, EyeClosedIcon } from "@primer/octicons-react";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

      if (response.status === 201) {
        await router.push("/cadastro/confirmar");
        return;
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <DefaultLayout title="Cadastro">
      <Stack align="center">
        <Heading as="h1">Cadastro</Heading>

        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <Stack gap="normal">
            <FormField
              label="Nome de usuário"
              size="large"
              autoComplete="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <FormField
              label="Email"
              size="large"
              autoComplete="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <FormField
              ref={passwordInputRef}
              label="Senha"
              size="large"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="new-password"
              onChange={(event) => setPassword(event.target.value)}
              trailingAction={
                <TextInput.Action
                  onClick={handleTogglePassword}
                  icon={showPassword ? EyeIcon : EyeClosedIcon}
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                />
              }
            />
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
      </Stack>
    </DefaultLayout>
  );
}
