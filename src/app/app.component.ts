import { Component } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 shopping_cart:any;
  showAdd:boolean=true;
 constructor(private cartService:CartService){

   this.cartService.getAllItems().subscribe(response =>{
     this.shopping_cart=response;
     console.log(this.shopping_cart);
   });
 }
 addNewItem(form){
  console.log(form);
   this.cartService.addItem(form).subscribe(response=>{
    this.shopping_cart = response;
   });
 }

deleteItem(id){
  this.cartService.removeItem(id).subscribe(response=>{
    this.shopping_cart =response;
  });
}
updateNewProduct(items){
  console.log(items);
  this.cartService.updateItem(items).subscribe(response=>{
    this.shopping_cart=response;
  })
}
toggleAdd(){
  this.showAdd=!this.showAdd;
}
toggle(index){
  
  this.shopping_cart[index].updatingForm=!this.shopping_cart[index].updatingForm;
}
}
