import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Banner, Spinner, Stack } from "@primer/react";

import DefaultLayout from "interface/DefaultLayout/index.js";
import { createErrorMessage } from "interface/index.js";

export default function ActivationPage() {
  const router = useRouter();
  const { activationTokenId } = router.query;

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [globalMessage, setGlobalMessage] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    async function activate() {
      try {
        const response = await fetch(
          `/api/v1/activations/${activationTokenId}`,
          {
            method: "PATCH",
          },
        );

        if (response.status === 200) {
          setIsSuccess(true);
          return;
        }

        if (response.status >= 400 && response.status <= 503) {
          const responseBody = await response.json();

          setGlobalMessage(createErrorMessage(responseBody));
          setIsSuccess(false);
          return;
        }

        throw new Error(response.statusText);
      } catch (error) {
        setGlobalMessage(error.message);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    }

    activate();
  }, [router.isReady, activationTokenId]);

  return (
    <DefaultLayout
      metadata={{
        title: "Ativar cadastro",
        description: "Estamos ativando seu cadastro. Aguarde um instante.",
      }}
    >
      {isLoading && (
        <Stack align="center" padding="spacious">
          <Spinner size="medium" />
        </Stack>
      )}

      {!isLoading && isSuccess && (
        <Banner
          variant="success"
          title="Sua conta foi ativada com sucesso!"
          style={{ maxWidth: "600px", margin: "30px auto" }}
        />
      )}

      {!isLoading && !isSuccess && (
        <Banner
          title={
            globalMessage ??
            "Não foi possível ativar sua conta. O link pode ter expirado."
          }
          variant="critical"
          style={{ maxWidth: "600px", margin: "30px auto" }}
        />
      )}
    </DefaultLayout>
  );
}
