let carrinho =[]
let modalQuantidade = 1;
let pizzaSelecionada;
let subtotal = 0;
let desconto;
let total;

const qs = (el) => {
    return document.querySelector(el)
}

// inicio do escopo da função de listagem das pizza
pizzaJson.map((item,index)=>{

let pizzaItem = qs('.models .pizza-item').cloneNode(true);

pizzaItem.setAttribute('data-key',index)
pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
pizzaItem.querySelector('.pizza-item--img img').src = item.img;
pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;



pizzaItem.querySelector('a').addEventListener('click',(evento) =>{

evento.preventDefault();
modalQuantidade = 1

let key = evento.target.closest('.pizza-item').getAttribute('data-key');

pizzaSelecionada = key ;
document.querySelector('.pizzaWindowArea').style.display = "flex";
qs('.pizzaWindowArea').style.opacity = 0;
setTimeout(() => {
    qs('.pizzaWindowArea').style.opacity = 1;
}, 100);

let pizzaWindow = qs('.pizzaWindowArea')



qs('.pizzaWindowArea img').src = pizzaJson[key].img;
qs('.pizzaWindowArea h1').innerHTML = pizzaJson[key].name;
qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

qs('.pizzaInfo--size.selected').classList.remove('selected')

document.querySelectorAll('.pizzaInfo--size').forEach((size,sizeIndex) => {
    

    if (sizeIndex == 2){
        size.classList.add('selected');
    }

    size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

});

qs('.pizzaInfo--qt').innerHTML = modalQuantidade;


qs(".pizzaInfo--cancelButton").addEventListener('click',sairDoModal)
qs(".pizzaInfo--cancelMobileButton").addEventListener('click',sairDoModal)


})



qs('.pizza-area').append(pizzaItem);

})


// fora do escopo da função de listagem das pizza


qs('.pizzaInfo--qtmais').addEventListener('click',()=>{



    
    modalQuantidade++
   
   
    qs('.pizzaInfo--qt').innerHTML = modalQuantidade;
       
   })
   
   
   qs('.pizzaInfo--qtmenos').addEventListener('click',()=>{
   
       if (modalQuantidade > 1){ 
       modalQuantidade--
      
      
       qs('.pizzaInfo--qt').innerHTML = modalQuantidade;
       }
      })


      document.querySelectorAll('.pizzaInfo--size').forEach((size,sizeIndex) => {
        
        size.addEventListener('click',()=>{

            qs('.pizzaInfo--size.selected').classList.remove('selected')
            size.classList.add('selected')


        })
    
    });
      

    qs('.pizzaInfo--addButton').addEventListener('click',()=>{

    let size = Number(qs('.pizzaInfo--size.selected').getAttribute('data-key'))


let identifier = pizzaJson[pizzaSelecionada].id+'@'+size

let key = carrinho.findIndex((item)=>{
    return item.identifier == identifier;
})

if (key > -1 ){

    carrinho[key].qt += modalQuantidade;
}else {

   carrinho.push({
        identifier,
        id:pizzaJson[pizzaSelecionada].id,
        size,
        qt:modalQuantidade
   })
}
atualizarCarrinho();
   sairDoModal();

    })


    function sairDoModal(){
        return  qs('.pizzaWindowArea').style.display = 'none';
    }


    qs('.menu-openner').addEventListener('click',()=>{

       if (carrinho.length > 0){
        qs('aside').style.left = '0';
       }


    })

    qs('.menu-closer').addEventListener('click',()=>{

        qs('aside').style.left = '100vw'


    })
   

function atualizarCarrinho(){
    let subtotal = 0;
    let desconto = 0;
    let total = 0;
    qs('.menu-openner span').innerHTML = carrinho.length;
   
    if (carrinho.length > 0){

        qs('.cart').innerHTML = '';
        qs('aside').classList.add('show');
        
        for(let i in carrinho){
            let pizzaItem = pizzaJson.find((item)=>{
                return item.id == carrinho[i].id;
            });

            let itemCarrinho = qs('.models .cart--item').cloneNode(true);
           
         

          subtotal +=  pizzaItem.price*carrinho[i].qt

            let tamanhoDaPizza;

            if (carrinho[i].size == 0){
                tamanhoDaPizza = 'Pequena'
            } else if (carrinho[i].size == 1){
                tamanhoDaPizza = 'Media'
            } else {
                tamanhoDaPizza = 'Grande'
            }


            itemCarrinho.querySelector('img').src = pizzaItem.img;
            itemCarrinho.querySelector('.cart--item-nome').innerHTML= `${pizzaItem.name} (${tamanhoDaPizza})`;
            itemCarrinho.querySelector('.cart--item--qt').innerHTML = carrinho[i].qt;
            



            itemCarrinho.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
               carrinho[i].qt++

              atualizarCarrinho();

            })
            itemCarrinho.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{

                

               if (carrinho[i].qt >1){

                  carrinho[i].qt--;
                 atualizarCarrinho();

               } else {
                carrinho.splice(i,1);
               }

               atualizarCarrinho();
            })

            

            qs('.cart').append(itemCarrinho);
        }

        desconto = subtotal *0.1;
        total = subtotal - desconto;
       qs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        qs('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        qs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
        
        
        

    } else {
        qs('aside').classList.remove('show');
        qs('aside').style.left = '100vw';
    }


}



