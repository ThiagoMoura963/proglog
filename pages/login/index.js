import { useState, useRef } from "react";
import { useRouter } from "next/router";
import useUser from "interface/hooks/useUser/index.js";
import { createErrorMessage } from "interface/index.js";

import DefaultLayout from "interface/DefaultLayout";
import FormField from "interface/FormField/index.js";
import { Button, Heading, Stack, TextInput, Banner } from "@primer/react";
import { EyeIcon, EyeClosedIcon } from "@primer/octicons-react";

export default function LoginPage() {
  const router = useRouter();
  const { fetchUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalMessage, setGlobalMessage] = useState(null);

  const KNOW_FIELDS = ["email", "password"];

  const passwordInputRef = useRef(null);

  function FocusAfterEnd() {
    setTimeout(() => {
      const input = passwordInputRef.current;
      const len = input.value.length;
      input.focus();
      input.setSelectionRange(len, len);
    });
  }

  function handleTogglePssword(event) {
    event.preventDefault();
    setShowPassword((prev) => !prev);
    FocusAfterEnd();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const requestBody = { email, password };
      const response = await fetch("/api/v1/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseBody = await response.json();

      if (response.status === 201) {
        await fetchUser();
        router.replace("/");
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

      console.log("key:", responseBody.key);

      console.log(fieldErrors);

      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <DefaultLayout title="Login">
      <Stack align="center" padding="spacious">
        <Heading as="h1">Login</Heading>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <Stack gap="normal">
            <FormField
              label="Email"
              type="text"
              size="large"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={fieldErrors.email}
            />
            <FormField
              ref={passwordInputRef}
              label="Senha"
              size="large"
              type={showPassword ? "text" : "password"}
              autoComplete="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={fieldErrors.password}
              trailingAction={
                <TextInput.Action
                  icon={showPassword ? EyeIcon : EyeClosedIcon}
                  onClick={handleTogglePssword}
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                />
              }
            />

            {globalMessage && (
              <Banner variant="critical" title={globalMessage} />
            )}

            <Button
              block
              type="submit"
              variant="primary"
              size="large"
              disabled={isLoading}
              loading={isLoading}
            >
              Entrar
            </Button>
          </Stack>
        </form>
      </Stack>
    </DefaultLayout>
  );
}
