import { Component } from '@angular/core';
import { Restaurant } from '../../Shared/models/Restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrl: './restaurant-listing.component.css'
})
export class RestaurantListingComponent {

  public restaurantList: Restaurant[];

  constructor(private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit() {

    this.getALLResaturants();

  }
  getALLResaturants() {

    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurantList = data;

      }
    )

  }

  onButtonClick(id: any) {
    this.router.navigate(['/food-catalogue', id]);
  }



  getRandomImage(): string {
    const imageCount = 8; // adjuest this number according to the images available in the asset folder
    const randomIndex = this.getRandomNumber(1, imageCount);

    return `${randomIndex}.jpg`;


  }
  getRandomNumber(min: number, max: number) {

    return Math.floor(Math.random() * (max - min)) + min;
  }

}
