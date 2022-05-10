describe("Webdaily Online CRM: init token", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/web-daily-online")
  })
  it("Click Button with empty input token", () => {
    cy.get("#btnRegister").click()
    cy.contains("*กรุณาระบุข้อมูล Token เพื่อลงทะเบียน").should("be.visible")
  })
  it("Click Button with not empty input token", () => {
    cy.get("#txtToken").type(`cGFua2hhbWhvbQ==`)
    cy.get("#btnRegister").click()
    cy.getCookie("database").should("not.be.empty")
    cy.url().should("include", "/login")
  })
})
