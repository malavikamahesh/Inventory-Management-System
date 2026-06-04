const products =
JSON.parse(localStorage.getItem("products")) || [];

document.getElementById(
"totalProducts"
).textContent=products.length;

document.getElementById(
"totalQty"
).textContent=
products.reduce(
(sum,p)=>sum+p.quantity,
0
);

document.getElementById(
"inventoryValue"
).textContent=
"₹"+
products.reduce(
(sum,p)=>sum+(p.quantity*p.price),
0
);

document.getElementById(
"lowStock"
).textContent=
products.filter(
p=>p.quantity<10
).length;

const categoryMap={};

products.forEach(p=>{

categoryMap[p.category] =
(categoryMap[p.category]||0)+
p.quantity;

});

const topCategory =
Object.keys(categoryMap).reduce(
(a,b)=>
categoryMap[a]>categoryMap[b]
?a:b,
Object.keys(categoryMap)[0]
);

document.getElementById(
"topCategory"
).textContent=
topCategory || "-";

new Chart(

document.getElementById(
"categoryChart"
),

{
type:"pie",

data:{

labels:Object.keys(categoryMap),

datasets:[{

data:Object.values(categoryMap)

}]

}

}

);

new Chart(

document.getElementById(
"itemChart"
),

{
type:"bar",

data:{

labels:products.map(
p=>p.name
),

datasets:[{

label:"Quantity",

data:products.map(
p=>p.quantity
)

}]

}

}

);