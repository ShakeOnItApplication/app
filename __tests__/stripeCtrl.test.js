var stripeCtrl = require("../server/stripe/stripeCtrl");

describe("stripeCtrl", () => {
  it("should not be undefined", () => {
    expect(stripeCtrl).toBeDefined();
  });

  it("should contain 3 functions", () => {
    expect(stripeCtrl).toHaveProperty('handleBet');
    expect(stripeCtrl).toHaveProperty('placeBet');
    expect(stripeCtrl).toHaveProperty('registerUser');
  });
});
