describe("Add Multiple Products", () => {
  const BASE_URL = Cypress.env("BASE_URL");

  beforeEach(() => {
    cy.visit(`${BASE_URL}/user/login`, { failOnStatusCode: false }).then(() => {
      cy.get('input[id="userName"]').type("BarAdmin"); // BarAdmin
      cy.get('input[id="password"]').type("BarAdmin"); // BarAdmin

      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/dashboard");
    });
  });

  it("Create multiple new products", () => {
    cy.visit(`${BASE_URL}/catalogue/products`, {
      failOnStatusCode: false,
    }).then(() => {
      cy.url().should("include", "/catalogue/products");

      cy.fixture("products.json").then((products) => {
        products.forEach((product) => {
          cy.contains("button", "Crear").should("be.visible").click();

          cy.get('input[id="name"]').type(product.name);
          cy.get('input[id="price"]').type(product.price);
          cy.get(".rdw-editor-main").type(product.description);

          // Enable stock
          // cy.get('[data-node-key="2"]').click();
          // cy.get("#isStockEnabled").should("be.visible").click();

          cy.contains("button", "Guardar cambios").should("be.visible").click();
        });
      });
    });
  });
});
