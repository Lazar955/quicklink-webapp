import { User } from '../../models/user';
import { Link } from '../../models/link';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { BrokerService } from '../../services/broker.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LinksComponent implements OnInit {
  private links: Link[] = [];
  private linksBack: Link[] = [];
  private user: User = {};
  private displayedColumns = ['Name', 'URL', 'Date created'];
  private link: Link = {};
  private currentLink: Link = {};
  private linkName: string = "";


  constructor(public broker: BrokerService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.setUser();
    this.getLinksData();
    console.log(this.user)
  }

  setUser() {
    this.user = JSON.parse(localStorage.getItem('User'))
  }

  setCurrentLink(link: Link) {
    this.currentLink = link;
  }

  openSnack(msg) {
    this.snackBar.open(msg, "Ok");
  }

  ngOnInit() {
  }

  createLink() {
    console.log(this.user)
    this.broker.createLink(this.user, this.link).subscribe(d => {
      this.getLinksData();
      this.openSnack((d as any).messages)
    }, err => {
      console.log(err)
    })
  }

  getLinksData() {
    this.broker.getLinksData(Number(this.user.userId)).subscribe((d) => {
      let data = d as any
      this.links = data;
      this.linksBack = data;
    }, e => {
      console.log(e)
    })
  }

  removeLink(link: Link) {
    this.broker.deleteLink(link).subscribe(data => {
      this.getLinksData();
      this.openSnack((data as any).messages)
    }, err => {
      console.log(err)
    })
  }

  shouldRemoveLink(link: Link) {
    if (window.confirm("Delete link? " + link.name)) {
      this.removeLink(link);
    }
  }

  filter() {
    if (this.linkName == "") {
      this.links = this.linksBack;
      return;
    }

    this.links = this.links.filter((link) => {
      return link.name.toLocaleLowerCase().indexOf(this.linkName.toLowerCase()) > -1;
    })
  }

  searchOnServer(){
    this.broker.searchOnServer(this.linkName,this.user.userId).subscribe(d=>{
      this.links = (d as Link[]);
    },err=>{
      console.log(err)
    })
  }
}
