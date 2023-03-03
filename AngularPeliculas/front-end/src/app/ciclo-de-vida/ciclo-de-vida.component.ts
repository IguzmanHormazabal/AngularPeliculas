import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RatingComponent } from '../utilidades/rating/rating.component';

@Component({
  selector: 'app-ciclo-de-vida',
  templateUrl: './ciclo-de-vida.component.html',
  styleUrls: ['./ciclo-de-vida.component.css']
})
export class CicloDeVidaComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit {

  @Input()
  titulo: string;
  @ViewChild(RatingComponent)
  ratingComponent: RatingComponent;

  timer: ReturnType<typeof setInterval>;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }



  ngOnChanges(changes: SimpleChanges): void {
    console.log("on changes");
    console.log(changes)
  }
  ngOnDestroy(): void {
    console.log("on destroy");
    clearInterval(this.timer);
  }
  ngDoCheck(): void {
    console.log("on check");
  }
  ngAfterViewInit(): void {
    console.log("on after view init");
    this.ratingComponent.ratingSeleccionado = 3;
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    console.log("on init");
     this.timer = setInterval(() => console.log(new Date()), 1000);
    
  }

}
