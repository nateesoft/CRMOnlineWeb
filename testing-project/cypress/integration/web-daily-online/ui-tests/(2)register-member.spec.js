describe("Webdaily Online CRM: register member", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/web-daily-online")
  })
  it("Input information for register member form", () => {
    // Register Database Token
    cy.get("#txtToken").type(`cGFua2hhbWhvbQ==`)
    cy.get("#btnRegister").click()
    cy.getCookie("database").should("not.be.empty")
    cy.url().should("include", "/login")

    // click register member link
    cy.contains("สมัครสมาชิกใหม่?").click()
    cy.url().should("include", "/register")

    // input data form
    cy.get(`[name="prefix"]`).select(`นาย`)
    cy.get(`[name="first_name"]`).type(`นที`)
    cy.get(`[name="last_name"]`).type(`ภูวงษ`)
    cy.get(`[name="birthday"]`).type(`1986-09-18`)
    cy.get(`[name="mobile"]`).type(`0864108409`)
    cy.get(`[name="email"]`).type(`natee.phuwong@gmail.com`)
    cy.get(`[name="password"]`).type(`000000`)
    cy.get(`[name="rePassword"]`).type(`000000`)
    cy.get(`[name="line_id"]`).type(`nathee_phuwong`)
    cy.get(`[type="submit"]`).click()
    cy.contains("Register Success")
    cy.contains("OK").click()

    // go to homepage
    cy.visit("http://localhost:3000/web-daily-online")
  })
})
