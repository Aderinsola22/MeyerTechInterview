import FetchWrapper from "./fetch-wrapper.js";
const API= new FetchWrapper("http://makeup-api.herokuapp.com/api/v1");
let itemImage=[];
let itemName=[]
let itemRating=[]
let itemPrice=[]
let itemDesc=[]
let itemColors=[];
let numString="";
const itemDisplay=document.querySelector(".row");
const mainpage=document.querySelector("#main");
const modalBox=document.querySelector("#modal")
const modalContent=document.querySelector(".modal-content");
const modalSpan=document.querySelector(".close")[0];
document.addEventListener("DOMContentLoaded",()=>{
  API.get("/products.json?brand=maybelline").then(APIdata =>
    {
     itemImage= APIdata.map(data => data.image_link);
     itemName= APIdata.map(data => data.name);
     itemRating=APIdata.map(data =>data.rating??"N/A");
     itemPrice=APIdata.map(data => data.price);
     itemDesc=APIdata.map(data=> data.description);
     itemColors=APIdata.map(data => data.product_colors);
    for(let i=0;i<APIdata.length;i++){
    itemDisplay.insertAdjacentHTML("beforeend",` <div class="col">
    <div class="item-image-${i}">
    <img src="${itemImage[i]}" alt="" width="200" height="200">
    </div>
    <div id="item-name-${i}"class="item-name">
     ${itemName[i]}
    </div>
    <div id="item-price-${i} class="item-price">
     ${itemPrice[i]}
    </div>
    <div id="item-rating-${i} class="item-rating">
     ${itemRating[i]}
    </div>
    <button id="view-more-${i}"class= "view-more-button">View More</button>
 </div>`)
    }
    
   const viewmoreButton=document.querySelectorAll(".view-more-button");
    viewmoreButton.forEach(view=>{
        view.addEventListener("click",event=>{
            numString= event.target.id.replace(/\D/g,"");
            modalPopup(numString);
         })
    })
    })
})
function modalPopup(target){
 modalBox.setAttribute("style","display:block")

 modalContent.innerHTML=`
 <div class="item-image-${target}">
 <img src="${itemImage[target]}" alt="" width="120" height="120">
 </div>
 <div id="item-name-${target}"class="item-name">
 ${itemName[target]}
 </div>
 <div id="item-price-${target} class="item-price">
 ${itemPrice[target]}
 </div>
 <div id="item-rating-${target} class="item-rating">
 ${itemRating[target]}
 </div>
 <div id="item-description-${target} class="item-description">
 ${itemDesc[target]}
 </div>
 `;
   
 window.addEventListener("click",event=>{
    if (event.target == modal){
        modalBox.setAttribute("style","display:none")
    }
 })
}
    
