import Head from "next/head";
import { PageLayout, Header, Text } from "@primer/react";
import { PackageIcon } from "@primer/octicons-react";

export default function DefaultLayout({ children, title = "ProgLog" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
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
        <PageLayout.Content>{children}</PageLayout.Content>
        <PageLayout.Footer divider="line" style={{ textAlign: "center" }}>
          <Text size="small">© {new Date().getFullYear()} ProgLog</Text>
        </PageLayout.Footer>
      </PageLayout>
    </>
  );
}
