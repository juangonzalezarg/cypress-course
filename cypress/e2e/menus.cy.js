describe("Add Menu", () => {
  const BASE_URL = Cypress.env("BASE_URL");

  beforeEach(() => {
    cy.visit(`${BASE_URL}/user/login`, { failOnStatusCode: false }).then(() => {
      cy.get('input[id="userName"]').type("BarAdmin");
      cy.get('input[id="password"]').type("BarAdmin");

      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/dashboard");
    });
  });

  it("Create multiple new menus", () => {
    cy.on("uncaught:exception", (err) => {
      // We ignore ResizeObserver errors and allow the test to proceed
      if (
        err.message.includes(
          "ResizeObserver loop completed with undelivered notifications"
        )
      ) {
        return false;
      }
      // Other errors will fail the test
      return true;
    });

    cy.visit(`${BASE_URL}/catalogue/menus`, {
      failOnStatusCode: false,
    }).then(() => {
      cy.url().should("include", "/catalogue/menus");

      cy.fixture("menus.json").then((menus) => {
        menus.forEach((menu) => {
          cy.contains("button", /^Crear$/)
            .should("be.visible")
            .click();

          cy.get("#menuTypeId").click();
          cy.get(".ant-select-dropdown").contains(menu.menuType).click();

          cy.get("#menuActionTypeId").click();
          cy.get(".ant-select-dropdown").contains(menu.menuActionType).click();

          cy.get("#deliveryTypeId").click();
          cy.get(".ant-select-dropdown").contains(menu.deliveryType).click();

          cy.get('input[id="name"]').type(menu.name);

          cy.get(`input[value="${menu.icon}"]`).parents("label").click();

          // Save new menu
          cy.contains("button", "Aceptar")
            .scrollIntoView()
            .should("be.visible")
            .click();

          cy.wait(4500);
        });
      });
    });
  });

  it("Create multiple new categories", () => {
    cy.fixture("menus.json").then((menus) => {
      menus.forEach((menu) => {
        cy.visit(`${BASE_URL}/catalogue/menus`, {
          failOnStatusCode: false,
        }).then(() => {
          cy.url().should("include", "/catalogue/menus");

          cy.get("table")
            .contains("td", menu.name)
            .parents("tr")
            .find("button")
            .eq(1)
            .click();

          cy.fixture("categories.json").then((categories) => {
            categories.forEach((category) => {
              cy.wait(4500);

              cy.contains("button", /^Crear$/)
                .should("be.visible")
                .click();

              cy.get('input[id="name"]').type(category.name);

              cy.get(".rdw-editor-main").type(category.description);

              cy.contains("button", "Aceptar").should("be.visible").click();
            });
          });
        });
      });
    });
  });
});
