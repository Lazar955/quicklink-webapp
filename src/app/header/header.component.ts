import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('Bearer');
    localStorage.removeItem('User');
    this.router.navigate(['login']);
  }

}
