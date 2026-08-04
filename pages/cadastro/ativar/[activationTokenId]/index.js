import { useRouter } from "next/router";

import DefaultLayout from "pages/interface/DefaultLayout/index.js";
import { Banner, Spinner, Stack } from "@primer/react";
import { useState, useEffect } from "react";

export default function ActivationPage() {
  const router = useRouter();
  const { activationTokenId } = router.query;

  const [status, setStatus] = useState("loading");

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

        setStatus(response.ok ? "success" : "error");
      } catch {
        setStatus("error");
      }
    }

    activate();
  }, [router.isReady, activationTokenId]);

  return (
    <DefaultLayout title="Ativar conta">
      {status === "loading" && (
        <Stack align="center" padding="spacious">
          <Spinner size="medium" />
        </Stack>
      )}

      {status === "success" && (
        <Banner
          variant="success"
          title="Sua conta foi ativada com sucesso!"
          style={{ maxWidth: "600px", margin: "30px auto" }}
        />
      )}

      {status === "error" && (
        <Banner
          title="Não foi possível ativar sua conta. O link pode ter expirado"
          variant="critical"
          style={{ maxWidth: "600px", margin: "30px auto" }}
        />
      )}
    </DefaultLayout>
  );
}
