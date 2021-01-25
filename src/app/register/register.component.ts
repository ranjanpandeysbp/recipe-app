import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  form: FormGroup;
  errMessage: any;
  message: any;
  showMenu: any;

  constructor(private recipeService: RecipeService, private formBuilder: FormBuilder) { 

  }

  ngOnInit() {

    let data = JSON.parse(localStorage.getItem("data"));
    if(data){
      this.showMenu = true;
    }else{
      this.showMenu = false;
    }

    this.form = this.formBuilder.group({
      name: [null,  [Validators.required, Validators.minLength(1)]],
      username: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.minLength(1)]],
      password: [null, [Validators.required]],
      phone: [null,  [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit() {
    this.message = "";
    this.errMessage = "";
    this.recipeService.registerUser(this.user)
    .subscribe(data => this.message = data["message"], error => this.errMessage = error["error"]["message"]);
  }

}
