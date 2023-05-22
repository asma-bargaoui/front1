import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TwoFirstLettersPipe } from '../../shared/pipes/two-first-letters.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  url: string = ""

  constructor(private router: Router){
    router.events.subscribe((e: any)=>{
      this.url = e.routerEvent?.url
    })
  }
}
