const Task = require("../Branch.model")('d2ViZGFpbHlfMDAx');

(async ()=>{
    let result;
    result = await Task.findById('52014a3e-ff0e-4932-a1a7-bec5d9d10d24');
    console.log(result);
    result = await Task.findByCode('b001');
    console.log(result);
    result = await Task.findAll();
    console.log(result);
})()
