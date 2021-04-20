// const temp = require("./dist/temp").default;
const temping = require("../dist/temping").default;

// dir create tracking
const temp = temping.track();

console.log(`generateName type1 : ${temping.generateName()}`);
console.log(`generateName type2 : ${temping.generateName("junho_")}`);
console.log(`generateName type3 : ${temping.generateName({ dir: __dirname })}`);
console.log(
  `generateName type3 : ${temping.generateName({
    dir: __dirname,
    suffix: ".json",
  })}`
);

temp.mkdir("junnnho");
temp.mkdir("junnnho");

// create dir remove
temp.clean();
