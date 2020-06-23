import { Injectable } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { OrderStatus } from 'src/app/core/enums/order-staus';

@Injectable({
  providedIn: 'root'
})
export class AvailabeOrdersService {
  availableOrdersData: Order[];
  availableOrdersColumns: string[];

  constructor() {
    this.availableOrdersData = [
      {
        id: 1,
        destination: 'Moscow',
        departure: 'Gomel',
        spentTime: 60000,
        distance: 300.25,
        userId: 1,
        employerId: 1,
        status: OrderStatus.New
      },
      {
        id: 2,
        destination: 'Paris',
        departure: 'Gomel',
        spentTime: 600000,
        distance: 3000.25,
        userId: 1,
        employerId: 1,
        status: OrderStatus.New
      },
      {
        id: 3,
        destination: 'Poland',
        departure: 'Gomel',
        spentTime: 3500,
        distance: 200.25,
        userId: 1,
        employerId: 1,
        status: OrderStatus.New
      }
    ];
    this.availableOrdersColumns = ['destination', 'departure', 'distance', 'spentTime', 'action'];
  }

  getAvailableOrdersData(): Order[] {
    return this.availableOrdersData;
  }

  getAcvailableOrderData(id: number): Order {
    return this.availableOrdersData.find(order => order.id === id);
  }

  getAvailableOrdersColumns(): string[] {
    return this.availableOrdersColumns;
  }
}
