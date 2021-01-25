import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  form: FormGroup;
  errMessage: any;
  showMenu: any;

  constructor(private router: Router, private recipeService: RecipeService, private formBuilder: FormBuilder) { 

  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("data"));
    if(data){
      this.showMenu = true;
    }else{
      this.showMenu = false;
    }
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(1)]],
      password: [null, [Validators.required]],
    });
    this.router.onSameUrlNavigation = 'reload';
  }

  onSubmit() {
    this.recipeService.login(this.user)
    .subscribe((data) => {
      console.log(data);
      localStorage.setItem("data", JSON.stringify(data));
      this.router.navigate(['recipe']);
    }, (error) => {
      debugger;
      if(error["error"]["status"] == 401){
        this.errMessage = "Invalid credentials";
      }
    });
  }

}
