
const qs = (el) => {
    return document.querySelector(el)
}


pizzaJson.map((item,index)=>{

let pizzaItem = qs('.models .pizza-item').cloneNode(true);

pizzaItem.setAttribute('data-key',index)
pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
pizzaItem.querySelector('.pizza-item--img img').src = item.img;
pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;



pizzaItem.querySelector('a').addEventListener('click',(evento) =>{

evento.preventDefault();


let key = evento.target.closest('.pizza-item').getAttribute('data-key');

document.querySelector('.pizzaWindowArea').style.display = "flex";
qs('.pizzaWindowArea').style.opacity = 0;
setTimeout(() => {
    qs('.pizzaWindowArea').style.opacity = 1;
}, 100);

let pizzaWindow = qs('.pizzaWindowArea')



qs('.pizzaWindowArea img').src = pizzaJson[key].img;
qs('.pizzaWindowArea h1').innerHTML = pizzaJson[key].name;
qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
// O preço deve ser interativo com a quantidade de pizzas
qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price}`;

qs('.pizzaInfo--qtmais').addEventListener('click',()=>{
    qs('.pizzaInfo--qt').innerHTML = Number(qs('.pizzaInfo--qt').innerHTML) + 1;


})

qs('.pizzaInfo--qtmenos').addEventListener('click',()=>{


    if (qs('.pizzaInfo--qt').innerHTML != '' || qs('.pizzaInfo--qt').innerHTML >= 0 ){
     qs('.pizzaInfo--qt').innerHTML = Number(qs('.pizzaInfo--qt').innerHTML) -1;

    } 
})
qs(".pizzaInfo--cancelButton").addEventListener('click',()=>{

    qs('.pizzaWindowArea').style.display = 'none';
    

})


















})



qs('.pizza-area').append(pizzaItem);






})



