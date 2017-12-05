import { Router } from '@angular/router';
import { BrokerService } from '../../services/broker.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  private token: string = "";


  constructor(public broker: BrokerService,public router: Router) { }

  ngOnInit() {
  }

  login() {
 
    console.log(this.token)
    this.broker.loginToken(this.token).subscribe((d ) => {
      let data = d as any;
      console.log(data)
      localStorage.setItem('Bearer',data.BearerToken)
      localStorage.setItem('User',JSON.stringify({"userId":data.user.user_id,"username":data.user.username}))
      this.router.navigate(['links']);
    },err=>{
       alert(err.error.messages)
      console.log(err.error)
    })
  }
}
