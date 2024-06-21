describe("My First Test", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      if (
        err.message.includes(
          "ResizeObserver loop completed with undelivered notifications"
        )
      ) {
        return false;
      }
      throw err;
    });

    cy.visit("https://admin.test1.parrancar.com");

    cy.get('input[id="userName"]').type("Admin");
    cy.get('input[id="password"]').type("Admin");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
  });

  it("Create a new client", () => {
    cy.visit("https://admin.test1.parrancar.com/administration/clients", {
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 404) {
        cy.log("Page not found (404)");
      } else {
        cy.url().should("include", "/administration/clients");
      }
    });

    cy.contains("button", "Crear").should("be.visible").click();
  });
});
