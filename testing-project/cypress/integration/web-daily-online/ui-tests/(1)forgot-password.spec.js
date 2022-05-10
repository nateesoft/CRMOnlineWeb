describe("Webdaily Online CRM: forgot password", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/web-daily-online")
  })
  it("Input information for forgot password form", () => {
    // Register Database Token
    cy.get("#txtToken").type(`cGFua2hhbWhvbQ==`)
    cy.get("#btnRegister").click()
    cy.getCookie("database").should("not.be.empty")
    cy.url().should("include", "/login")

    // click forgot password link
    cy.contains("ลืมรหัสผ่าน").click()
    cy.url().should("include", "/forgot-password")

    // input data form
    cy.get(`[name="email"]`).type(`softpos@gmail.com`)
    cy.get(`[name="mobile"]`).type(`0864108403`)
    cy.get(`[name="confirm_secret"]`).type(`111111`)
    cy.get(`[type="submit"]`).click()
    cy.contains("OK").click()
  })
})
