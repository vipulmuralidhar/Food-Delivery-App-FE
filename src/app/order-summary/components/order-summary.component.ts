import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/OrderService';
import { OrderDTO } from '../models/OrderDTO';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  orderSummary?: OrderDTO;
  showDialog: boolean = false;
  total: any;
  obj: any;


  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { }



  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    this.obj = JSON.parse(data);
    this.obj.userID = 1;
    this.orderSummary = this.obj;

    this.total = this.orderSummary.foodItemsList?.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.quantity * currentValue.price);
    }, 0);

  }

  closeDialog() {

    this.showDialog = false;
    this.router.navigate(['/']);

  }
  saveOrder() {
    this.orderService.saveOrder(this.orderSummary).subscribe(

      response => {

        this.showDialog = true;
      },
      error => {

        console.error('Failed to save data : ', error)
      }

    )
  }

}
