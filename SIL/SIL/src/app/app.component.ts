import { Component } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'sil-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Spanish In London';  
}
  