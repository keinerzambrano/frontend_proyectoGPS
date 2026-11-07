
document.addEventListener("DOMContentLoaded",function(){

const toggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

if(toggle){
toggle.addEventListener("click",function(){
sidebar.classList.toggle("active");
});
}

const ctx = document.getElementById('ordersChart');

if(ctx){
new Chart(ctx,{
type:'line',
data:{
labels:['Lun','Mar','Mie','Jue','Vie','Sab','Dom'],
datasets:[{
label:'Pedidos',
data:[12,19,8,15,22,30,18],
borderWidth:2,
fill:false
}]
}
});
}

});
