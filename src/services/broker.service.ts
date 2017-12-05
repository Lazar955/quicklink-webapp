import { SERVER_URL } from '../config/config';
import { User } from '../models/user';
import { Link } from '../models/link';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BrokerService {

  private serverUrl: string = SERVER_URL + "quicklink/";
  private loginTokenRoute: string = "user/loginToken";
  private getAllLinksDataRoute: string = "link/user/";
  private createLinkDataRoute: string = "link/create";
  private deleteLinkDataRoute: string = "link/delete";
  private findLinkDataRoute: string = "link/find";

  private bearerToken: string = "";
  constructor(public http: HttpClient) {
    this.bearerToken = localStorage.getItem('Bearer');
  }

  isAuthenticated(): boolean {
    const bearer = localStorage.getItem('Bearer');
    return bearer == "" || !bearer ? false : true;
  }

  logout(): void {
    localStorage.removeItem('Bearer');
  }

  loginToken(token) {

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    let data = {
      tokenValue: token
    }

    let body = JSON.stringify(data);
    return this.http.post(this.serverUrl + this.loginTokenRoute, body)
  }

  getLinksData(userId) {
    let headers = new HttpHeaders(
      {
        'Auth': this.bearerToken,
        'Content-Type': 'application/json'
      }
    );

    return this.http.get(this.serverUrl + this.getAllLinksDataRoute + userId, { headers })
  }

  createLink(user: User, link: Link) {
    let headers = new HttpHeaders(
      {
        'Auth': this.bearerToken,
        'Content-Type': 'application/json'
      }
    );

    console.log(user)
    let data = {
      username: user.username,
      name: link.name,
      url: link.url
    }
    console.log(data)
    let body = JSON.stringify(data);
    return this.http.post(this.serverUrl + this.createLinkDataRoute, body,
      { headers })
  }

  deleteLink(link: Link) {
    let headers = new HttpHeaders(
      {
        'Auth': this.bearerToken,
        'Content-Type': 'application/json'
      }
    );

    let data = {
      linkId: link.linkId,
    }
    console.log(data)
    let body = JSON.stringify(data);
    return this.http.post(this.serverUrl + this.deleteLinkDataRoute, body, { headers: headers })
  }

  searchOnServer(name, userId) {
    let headers = new HttpHeaders(
      {
        'Auth': this.bearerToken,
        'Content-Type': 'application/json'
      }
    );

    let data = {
      name: name,
      userId: userId
    }
    let body = JSON.stringify(data);
    return this.http.post(this.serverUrl + this.findLinkDataRoute, body, { headers: headers })
  }
}
