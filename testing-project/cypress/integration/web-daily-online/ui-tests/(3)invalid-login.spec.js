describe("Webdaily Online CRM: invalid login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/web-daily-online")
  })
  it("Input username and password invalid", () => {
    // Register Database Token
    cy.get("#txtToken").type(`cGFua2hhbWhvbQ==`)
    cy.get("#btnRegister").click()
    cy.getCookie("database").should("not.be.empty")
    cy.url().should("include", "/login")

    // input success login
    cy.get(`[name="username"]`).type(`softpos@gmail.com`)
    cy.get(`[name="password"]`).type(`000000`)
    cy.get("#btnSubmit").click()
    cy.contains("Username or password invalid")

    // try to logout
    cy.contains(`OK`).click()
  })
})
