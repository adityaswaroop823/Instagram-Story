let storiesData;

describe("Instagram Stories Feature", () => {
  before(() => {
    cy.request(`${Cypress.config("baseUrl")}/stories.json`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array").that.is.not.empty;
      storiesData = response.body;
    });
  });

  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}`);
  });

  it("should fetch and display stories", () => {
    cy.wrap(storiesData).should("have.length.greaterThan", 0);
    cy.get("[data-testid='story']").should("have.length", storiesData.length);
  });

  it("should open a story when clicked", () => {
    cy.get("[data-testid='story']").first().click();
    cy.get("[data-testid='storyimage']").should("be.visible");

    cy.wrap(storiesData[0]).then((story) => {
      cy.get("[data-testid='storyimage']").should(
        "have.attr",
        "src",
        story.storyImage
      );
      cy.contains(story.userName).should("be.visible");
    });
  });

  it("should show the next story on right click", () => {
    if (storiesData.length > 1) {
      cy.get("[data-testid='story']").first().click();

      cy.get("[data-testid='storyimage']").click("right", { force: true });

      cy.wrap(storiesData[1]).then((story) => {
        cy.log(cy.get("[data-testid='storyimage']"));
        cy.get("[data-testid='storyimage']").should(
          "have.attr",
          "src",
          story.storyImage
        );
      });
    }
  });

  it("should show the previous story on left click", () => {
    if (storiesData.length > 1) {
      cy.get("[data-testid='story']").eq(1).click();
      cy.get("[ data-testid='storyContainer']").click("left");

      cy.wrap(storiesData[0]).then((story) => {
        cy.get("[data-testid='storyimage']").should(
          "have.attr",
          "src",
          story.storyImage
        );
      });
    }
  });

  it("should close the story when close button is clicked", () => {
    cy.get("[data-testid='story']").first().click();
    cy.get("[data-testid='closeBtn']").click();
    cy.get("[data-testid='storyimage']").should("not.exist");
  });
});
