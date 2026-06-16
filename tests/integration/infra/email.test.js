import orchestrator from "tests/orchestrator.js";
import email from "infra/email.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "thiago <thiagomjfelis@gmail.com>",
      to: "thiagomjfelis3@gmail.com",
      subject: "Teste de assunto",
      text: "Teste de corpo",
    });

    await email.send({
      from: "thiago <thiagomjfelis@gmail.com>",
      to: "thiagomjfelis3@gmail.com",
      subject: "Último assunto",
      text: "Último corpo",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<thiagomjfelis@gmail.com>");
    expect(lastEmail.recipients[0]).toBe("<thiagomjfelis3@gmail.com>");
    expect(lastEmail.subject).toBe("Último assunto");
    expect(lastEmail.text).toBe("Último corpo\r\n");
  });
});
