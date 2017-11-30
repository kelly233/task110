const loadAllItems = require('./items');
const loadPromotions= require('./promotions');
function addIdandNum(inputs,result) {
  for(let item of inputs){
    let a = item.substring(0,8);
    let b = parseInt(item.substring(11,12));
    result.push({id:a,num:b});
  }
  return result;
}
function addNameandPrice(allItems,result) {
  for(let str of allItems){
    for(let item of result){
      if(str.id === item.id){item.name = str.name;item.price = str.price;}
    }
  }
  return result;
}
function countBill(result) {
  let sum1 = 0;
  for(let item of result){
    sum1 += item.num * item.price;
  }
  return sum1;
}
function HalfPriceDiscount(promotions,result) {
  let sum2 = 0;
  let re = [];
  for(let str of promotions){if(str.type = '指定菜品半价'){re = str.items;}}
  for(let item of result){
    if(item.id === re[0] || item.id === re[1]){item.light = 1;}
    else{item.light = 0;}
  }
  for(let item of result){
    if(item.light === 0){sum2 += item.price*item.num;}
    if(item.light === 1){sum2 += (item.price/2)*item.num}
  }
  return sum2;
}
function printInventory(sum1,sum2,cheap,result){
  let s ="============= 订餐明细 =============\n";
  for(let item of result){
    s += item.name + " x " + item.num + " = " + parseInt(item.num * item.price) + "元\n" ;
  }
  s += "-----------------------------------\n"
  if (sum1 === sum2 && sum1 < 30) { s += "总计：" + sum1 + "元\n";}
  if (sum1 > sum2 && sum1 < 30){
    s += "使用优惠:\n" + "指定菜品半价(黄焖鸡，凉皮)，省"+ cheap +"元\n" + "-----------------------------------\n" +
      "总计：" + sum2 +"元\n" ;
  }
  if (sum1 >= 30) {
    sum1 -= 6;
    if (sum1 <= sum2) {
      s += "使用优惠:\n" + "满30减6元，省6元\n" + "-----------------------------------\n" + "总计："+ sum1 + "元\n";
    }
    if (sum1 > sum2) {
      s += "使用优惠:\n" + "指定菜品半价(黄焖鸡，凉皮)，省"+ cheap +"元\n" + "-----------------------------------\n" +
        "总计：" + sum2 +"元\n" ;
    }
  }
  s += "===================================";
  return s;
}

function bestCharge(inputs) {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let result = [];
  result = addIdandNum(inputs, result);
  result = addNameandPrice(allItems, result);
  let sum1 = countBill(result);
  let sum2 = HalfPriceDiscount(promotions, result);
  let cheap = sum1-sum2;
  return printInventory(sum1,sum2,cheap,result);
}
module.exports=bestCharge;
