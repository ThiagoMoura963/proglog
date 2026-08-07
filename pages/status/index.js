import useSWR from "swr";
import { Heading, Label, Stack } from "@primer/react";
import DefaultLayout from "interface/DefaultLayout/index.js";
import { SkeletonText } from "@primer/react/experimental";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <div>
      <Stack direction="horizontal" align="center">
        Última atualização:{" "}
        {isLoading ? (
          <SkeletonText width="20ch" />
        ) : (
          <Label variant="success">
            {new Date(data.updated_at).toLocaleString("pt-BR")}
          </Label>
        )}
      </Stack>
    </div>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const database = data?.dependencies?.database;

  return (
    <Stack gap="condensed">
      {isLoading ? (
        <SkeletonText width="25ch" />
      ) : (
        <div>
          Conexões disponíveis:{" "}
          <Label
            variant={database?.max_connections > 70 ? "success" : "danger"}
          >
            {database?.max_connections}
          </Label>
        </div>
      )}

      {isLoading ? (
        <SkeletonText width="25ch" />
      ) : (
        <div>
          Conexões abertas:{" "}
          <Label
            variant={
              database?.opened_connections < database?.max_connections * 0.7
                ? "success"
                : "danger"
            }
          >
            {database?.opened_connections}
          </Label>
        </div>
      )}

      {isLoading ? (
        <SkeletonText width="25ch" />
      ) : (
        database?.version && (
          <div>
            Versão do Postgres:{" "}
            <Label variant="success">{database.version}</Label>
          </div>
        )
      )}
    </Stack>
  );
}

export default function StatusPage() {
  return (
    <DefaultLayout title="Status">
      <Stack gap="condensed">
        <Heading as="h1">Status do Site</Heading>

        <UpdatedAt />

        <Stack gap="condensed">
          <Heading as="h2" sx={{ fontSize: 2 }}>
            Banco de Dados
          </Heading>
          <DatabaseStatus />
        </Stack>
      </Stack>
    </DefaultLayout>
  );
}
