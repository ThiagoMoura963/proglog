import { PackageIcon } from "@primer/octicons-react";
import { Heading, Label, ProgressBar, Stack, Text } from "@primer/react";
import DefaultLayout from "interface/DefaultLayout";

export default function Home() {
  const completed = 5;
  const total = 10;
  const progress = (completed / total) * 100;

  return (
    <DefaultLayout title="ProgLog">
      <Stack align="center" gap="spacious">
        <Label variant="success">Em construção</Label>

        <PackageIcon size={48} />

        <Heading as="h1">ProgLog</Heading>

        <Text style={{ textAlign: "center", maxWidth: "360px" }}>
          Gestão operacional logística para programação e acompanhamento de
          cargas.
        </Text>

        <div style={{ width: "320px" }}>
          <ProgressBar
            progress={progress}
            aria-label={`${completed} de ${total} etapas concluídas`}
          />

          <div>
            <span>
              {completed} de {total}
            </span>

            <span
              style={{
                clipPath: "inset(50%)",
                height: "1px",
                overflow: "hidden",
                position: "absolute",
                whiteSpace: "nowrap",
                width: "1px",
              }}
            >
              etapas concluídas
            </span>
          </div>
        </div>
      </Stack>
    </DefaultLayout>
  );
}
