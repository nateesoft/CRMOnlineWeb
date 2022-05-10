describe("Webdaily Online CRM: login by user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/web-daily-online")
  })
  it("Input username and password valid", () => {
    // Register Database Token
    cy.get("#txtToken").type(`cGFua2hhbWhvbQ==`)
    cy.get("#btnRegister").click()
    cy.getCookie("database").should("not.be.empty")
    cy.url().should("include", "/login")

    // input success login
    cy.get(`[name="username"]`).type(`iomegayut@gmail.com`)
    cy.get(`[name="password"]`).type(`18181818`)
    cy.get("#btnSubmit").click()
    cy.url().should("include", "/dashboard")
    cy.getCookie("token").should("not.be.empty")

    // try to logout
    cy.get("#btnLogout").click()
  })
})
