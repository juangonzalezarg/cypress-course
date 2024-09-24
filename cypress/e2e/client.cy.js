describe("Add Multiple Products", () => {
  const BASE_URL = Cypress.env("BASE_URL");
  const BAR_TIMER_CLASS_SELECTOR = Cypress.env("BAR_TIMER_CLASS_SELECTOR");

  beforeEach(() => {
    cy.visit(`${BASE_URL}/user/login`, { failOnStatusCode: false }).then(() => {
      cy.get('input[id="userName"]').type("Admin");
      cy.get('input[id="password"]').type("Admin");

      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/dashboard");
    });
  });

  it("Create new client", () => {
    cy.visit(`${BASE_URL}/administration/clients`, {
      failOnStatusCode: false,
    }).then(() => {
      cy.url().should("include", "/administration/clients");

      cy.fixture("client.json").then((client) => {
        cy.contains("button", "Crear").should("be.visible").click();

        // General Tab
        cy.get('input[id="name"]').type(client.name);
        cy.get('input[id="phoneNumber"]').type(client.phoneNumber);
        cy.get('input[id="whatsAppNumber"]').type(client.whatsAppNumber);
        cy.get('input[id="email"]').type(client.email);
        cy.get('input[id="hubspot"]').type(client.hubspot);
        cy.get('input[id="code"]').type(client.code);

        cy.get("#countryId").click();
        cy.get(".ant-select-dropdown").contains(client.country).click();

        cy.get('input[id="autogestion-location"]')
          .type(client.address)
          .wait(1500)
          .type("{downarrow}")
          .type("{enter}");

        cy.get('textarea[id="description"]').type(client.description);
        cy.get('textarea[id="message"]').type(client.message);

        cy.get("#planTypeId").click();
        cy.get(".ant-select-dropdown").contains(client.planType).click();

        cy.get("#managementIsActive").click();

        // Sales Tab
        cy.get('[data-node-key="2"]').click();
        cy.get("#CASH").click();
        cy.get("#CARD").click();
        cy.get("#TRANSFER").click();
        cy.get("#ROOM").click();

        cy.get('input[id="accountNumber"]').type(client.accountNumber);
        cy.get('input[id="alias"]').type(client.alias);
        cy.get('input[id="holderName"]').type(client.holderName);
        cy.get('input[id="bankName"]').type(client.bankName);

        // Schedule Tab
        cy.get('[data-node-key="5"]').click();

        cy.get(BAR_TIMER_CLASS_SELECTOR).each(($el) => {
          // We check if there is an h1 within the div that contains the text of any day of the week
          const dayText = $el.find("h1").text();

          const weekdays = [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
          ];
          const weekend = ["Sabado", "Domingo", "Feriados"];

          cy.log("Day text: " + dayText);

          if (weekdays.includes(dayText)) {
            // Inside the div with the day, we search for the inputs
            cy.wrap($el).within(() => {
              cy.get("input").eq(2).type(client.startTime, { force: true });
              cy.get("input").eq(3).type(client.endTime, { force: true });
            });
          } else if (weekend.includes(dayText)) {
            // For weekends (Saturday, Sunday, Holidays)
            cy.wrap($el).within(() => {
              cy.get("input").eq(0).click({ force: true });
            });
          }
        });

        // Save new client
        cy.contains("button", "Guardar cambios")
          .scrollIntoView()
          .should("be.visible")
          .click();
      });
    });
  });
});
