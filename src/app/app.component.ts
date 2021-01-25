import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipe Management App';
  description = 'Recipe App helps in managing the recipes'
  showMenu: any;
  constructor(private router: Router) {

  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("data"));
    if(data){
      this.showMenu = true;
    }else{
      this.showMenu = false;
    }
    this.router.onSameUrlNavigation = 'reload';
  }

  logout(event) {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
