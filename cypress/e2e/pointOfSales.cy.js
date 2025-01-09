describe("PointOfSales", () => {
  const BASE_URL = Cypress.env("BASE_URL");

  beforeEach(() => {
    cy.visit(`${BASE_URL}/user/login`, { failOnStatusCode: false }).then(() => {
      cy.get('input[id="userName"]').type("BarAdmin");
      cy.get('input[id="password"]').type("BarAdmin");

      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/dashboard");
    });
  });

  it("should create multiple new point of sales", () => {
    cy.visit(`${BASE_URL}/sales/pointOfSales`, {
      failOnStatusCode: false,
    }).then(() => {
      cy.fixture("pointOfSales.json").then((pointOfSales) => {
        pointOfSales.forEach((pointOfSale) => {
          // Click the "Crear" button to open the modal
          cy.contains("button", /^Crear$/)
            .should("be.visible")
            .click();

          // Fill in the form fields
          cy.get('input[id="clientPointOfSale_name"]').type(pointOfSale.name);

          // input type="search" id="clientPointOfSale_deliveryTypes"
          pointOfSale.deliveryTypes.forEach((deliveryType) => {
            cy.get(
              'input[type="search"][id="clientPointOfSale_deliveryTypes"]'
            ).click();
            cy.get(".ant-select-dropdown").contains(deliveryType).click();
          });
          // input type="search" id="clientPointOfSale_deliveryTypes"
          // cy.get(
          //   'input[type="search"][id="clientPointOfSale_deliveryTypes"]'
          // ).type(pointOfSale.deliveryTypes);

          // Submit the form
          cy.get("button").contains("Guardar").click();

          // Verify that the success notification is displayed
          cy.get(".ant-notification-notice-success").should(
            "contain",
            "El punto de venta se creó correctamente."
          );

          // Wait for the notification to disappear
          cy.wait(4500);

          // Wait for the notification to disappear
          cy.get(".ant-notification-notice-success").should("not.exist");
        });
      });
    });
  });
});
