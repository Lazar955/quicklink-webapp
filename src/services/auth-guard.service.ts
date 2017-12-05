import { BrokerService } from './broker.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService {

  constructor(public broker: BrokerService, public router: Router) { }

  canActivate(): boolean {
    if (!this.broker.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
