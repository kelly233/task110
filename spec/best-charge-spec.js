const bestCharge = require('../src/best-charge');

describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs);
    let expected = "============= 订餐明细 =============\n" +
      "黄焖鸡 x 1 = 18元\n" +
      "肉夹馍 x 2 = 12元\n" +
      "凉皮 x 1 = 8元\n" +
      "-----------------------------------\n" +
      "使用优惠:\n" +
      "指定菜品半价(黄焖鸡，凉皮)，省13元\n" +
      "-----------------------------------\n" +
      "总计：25元\n" +
      "===================================";

    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs)
    let expected = "============= 订餐明细 =============\n" +
    "肉夹馍 x 4 = 24元\n" +
    "凉皮 x 1 = 8元\n" +
    "-----------------------------------\n" +
    "使用优惠:\n" +
    "满30减6元，省6元\n" +
    "-----------------------------------\n" +
    "总计：26元\n" +
    "===================================";
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs);
    let expected = "============= 订餐明细 =============\n" +
      "肉夹馍 x 4 = 24元\n" +
      "-----------------------------------\n" +
      "总计：24元\n" +
      "===================================";
    expect(summary).toEqual(expected)
  });

});
