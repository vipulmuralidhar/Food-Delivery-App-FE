import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../service/fooditem.service';
import { FoodCataloguePage } from '../../Shared/models/FoodCataloguePage';
import { FoodItem } from '../../Shared/models/FoodItem';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrl: './food-catalogue.component.css'
})
export class FoodCatalogueComponent {


  restaurantId: number;
  foodItemResponse: FoodCataloguePage;
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage ;

  constructor(private route: ActivatedRoute, private fodItemService: FoodItemService, private router: Router) { }



  ngOnInit() {

    this.route.paramMap.subscribe(
      (params: any): void => {
        this.restaurantId = +params.get('id');
      });

    this.getFoodItemsByRestaurant(this.restaurantId);

  }



  getFoodItemsByRestaurant(restaurantId: number) {
    this.fodItemService.getFoodItemsByRestaurant(this.restaurantId).subscribe(

      data => {


       // console.info('Showing data*******'+ data);
        this.foodItemResponse = data;
        //console.info('Showing this.foodItemResponse*******'+ this.foodItemResponse.restaurant.name);
        
      }
    )
  }




  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }
  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }

    }
  }


  onCheckOut() {
    this.foodItemCart;
    this.orderSummary = {
      foodItemsList: [],
      restaurant: null
    }
    this.orderSummary.foodItemsList = this.foodItemCart;
    this.orderSummary.restaurant = this.foodItemResponse.restaurant;
    this.router.navigate(['/ordersummary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });
  }


}

