import { Component, OnInit } from '@angular/core';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public keywords: string;
  public history: any[] = new Array();
  constructor() { }

  ngOnInit() {
  }
  check() {
    if (this.history.indexOf(this.keywords) === -1) {
      return true;
    }
  }
  doClickSearch() {
    if (this.check()) {
      this.history.push(this.keywords);
      this.keywords = '';
    }
      
  }

  doKeySearch(event) {
    if (event.keyCode === 13) {
      if (this.check()) {
        this.history.push(this.keywords);
        this.keywords = '';
      } else {
        return;
      }
    }
  }

  deletHistory(key) {
    this.history.splice(key, 1);
  }

  deleteAll() {
    this.keywords = '';
    this.history = [];
  }
}
