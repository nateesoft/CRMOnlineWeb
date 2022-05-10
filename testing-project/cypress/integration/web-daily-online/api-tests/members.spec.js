describe("CRM-Member api testing", () => {
  it("fetches Member items - GET", () => {
    cy.request({
      method: "GET",
      url: "/api/member/findAll/1/20",
      headers: {
        database: "cGFua2hhbWhvbQ",
        Authorization: "Basic YWRtaW46c29mdHBvczIwMTM="
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200)
    })
  })
})
