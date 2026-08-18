import Head from "next/head";
import { PageLayout, Header, Text } from "@primer/react";
import { PackageIcon } from "@primer/octicons-react";
import styles from "./index.module.css";

const contentWidthClasses = {
  small: styles.smallContent,
};

export default function DefaultLayout({
  children,
  metadata = {},
  contentWidth,
}) {
  const extraContentClassName = contentWidthClasses[contentWidth];

  return (
    <>
      <Head>
        <title>
          {metadata.title ? `${metadata.title} · ProgLog` : "ProgLog"}
        </title>

        {metadata.description && (
          <meta name="description" content={metadata.description} />
        )}
      </Head>

      <Header>
        <Header.Item full>
          <Header.Link href="/">
            <PackageIcon
              size={30}
              verticalAlign="middle"
              style={{ marginRight: "3px" }}
            />
            <Text size="large">ProgLog</Text>
          </Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/login">Login</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/cadastro">Cadastrar</Header.Link>
        </Header.Item>
      </Header>

      <PageLayout>
        <PageLayout.Content
          width={contentWidth}
          className={extraContentClassName}
        >
          {children}
        </PageLayout.Content>
        <PageLayout.Footer divider="line" style={{ textAlign: "center" }}>
          <Text size="small">© {new Date().getFullYear()} ProgLog</Text>
        </PageLayout.Footer>
      </PageLayout>
    </>
  );
}
