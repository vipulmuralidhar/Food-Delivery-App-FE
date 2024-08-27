import { FoodItem } from "../../Shared/models/FoodItem";
import { Restaurant } from "../../Shared/models/Restaurant";

export interface OrderDTO {

    foodItemsList?: FoodItem[];
    userDTO?: number;
    restaurant?: Restaurant;
}