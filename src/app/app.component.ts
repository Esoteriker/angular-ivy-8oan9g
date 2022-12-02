import {
  CdkDragDrop,
  CdkDragExit,
  copyArrayItem,
  moveItemInArray,
  DragDropModule,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, VERSION } from '@angular/core';

type IMenu = {
  title: string;
  id: number;
  price: number;
  temp?: boolean;
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  menu: Array<IMenu> = [
    { title: 'pork', price: 12, id: 1 },
    { title: 'duck', price: 12, id: 2 },
    { title: 'chicken', price: 12, id: 3 },
    { title: 'beef', price: 12, id: 4 },
    { title: 'soup', price: 12, id: 5 },
  ];

  menuOriginal: Array<IMenu> = [
    { title: 'pork', price: 12, id: 1 },
    { title: 'duck', price: 12, id: 2 },
    { title: 'chicken', price: 12, id: 3 },
    { title: 'beef', price: 12, id: 4 },
    { title: 'soup', price: 12, id: 5 },
  ];
  table: Array<IMenu> = [];

  drop(event: any) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const item = this.menuOriginal.find((it) => it.id === event.item.data.id);
      if (item) {
        // add the item again at the same place, when the number of units in gallery less then 9, it means needed to be added

        this.menu.splice(event.previousIndex, 0, item);
      }
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (event.previousContainer.data) {
      this.menu = this.menu.filter((f) => !f.temp);
    }
  }

  exited(event: any) {
    console.log('before');
    const currentIdx = event.container.data.findIndex(
      (f) => f.id === event.item.data.id
    );
    console.log(currentIdx);
    console.log(this.menu);
    this.menu.splice(currentIdx + 1, 0, {
      ...event.item.data,
      temp: true,
    });
    console.log(this.menu);
    console.log('after');
  }
  entered() {
    this.menu = this.menu.filter((f) => !f.temp);
  }
}
