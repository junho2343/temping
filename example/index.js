// const temp = require("./dist/temp").default;
const temping = require("../dist/temping").default;

// dir create tracking
const temp = temping.track();

// /var/folders/cv/qcwshmd52_5bptvrrpclp6y40000gn/T/2021321-9700-4lgcj5cuik
console.log(temp.mkdir());

// /var/folders/cv/qcwshmd52_5bptvrrpclp6y40000gn/T/junho_2021321-9700-4lgcj5cuik
console.log(temp.mkdir("junho_"));

// /var/folders/cv/qcwshmd52_5bptvrrpclp6y40000gn/T/2021321-9700-4lgcj5cuik
console.log(temping.path());

// /var/folders/cv/qcwshmd52_5bptvrrpclp6y40000gn/T/junho_2021321-9700-4lgcj5cuik
console.log(temping.path("junho_"));

// /Users/junho/repo/temping/example/2021321-9700-2amxgp4dmm8
console.log(temping.path({ dir: __dirname }));

// /Users/junho/repo/temping/example/2021321-9700-2amxgp4dmm8.zip
console.log(temping.path({ dir: __dirname, suffix: ".zip" }));

// /Users/junho/repo/temping/example/junho_2021321-9700-2amxgp4dmm8.zip
console.log(temping.path({ dir: __dirname, suffix: ".zip", prefix: "junho_" }));

// You can use it like this.
console.log(temp.path());

// delete create directory
temp.clean();
