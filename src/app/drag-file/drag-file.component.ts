import {Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragMove,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-file',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './drag-file.component.html',
  styleUrls: ['./drag-file.component.css']
})
export class DragFileComponent {

  @ViewChild('boundaryElement') boundaryElement: ElementRef | undefined;
  @ViewChild('dragElement') dragElement: ElementRef | undefined;

  items: any = [
    {
      name:'Qr code 1',
      x: 0,
      y: 0
    },
    {
      name:'Qr code 2',
      x: 0,
      y: 0
    },
    {
      name:'Qr code 3',
      x: 0,
      y: 0
    },
    {
      name:'Qr code 4',
      x: 0,
      y: 0
    },
  ];
  items2: any = [];

  onDrop(event: CdkDragDrop<any>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    if (!this.items2.includes(this.items[event.currentIndex])) {
      this.items2.push(this.items[event.currentIndex])
    }else {
      console.log('already in')
    }
  }
  onMoved(event: CdkDragMove) {
    // @ts-ignore
    const boundaryRect = this.boundaryElement.nativeElement.getBoundingClientRect();
    // @ts-ignore
    const dragRect = this.dragElement.nativeElement.getBoundingClientRect();

    const boundaryLeft = boundaryRect.left;
    const boundaryRight = boundaryRect.right - dragRect.width;
    const boundaryTop = boundaryRect.top;
    const boundaryBottom = boundaryRect.bottom - dragRect.height;

    let x = event.source.getFreeDragPosition().x;
    let y = event.source.getFreeDragPosition().y;

    if (x < boundaryLeft) {
      x = boundaryLeft;
    } else if (x > boundaryRight) {
      x = boundaryRight;
    }

    if (y < boundaryTop) {
      y = boundaryTop;
    } else if (y > boundaryBottom) {
      y = boundaryBottom;
    }

    event.source.element.nativeElement.style.transform = `translate(${x}px, ${y}px)`;

  }

  onMovedShow(event:CdkDragMove, item: any){
    item.x = event.source.getFreeDragPosition().x
    item.y = event.source.getFreeDragPosition().y;
  }
}
