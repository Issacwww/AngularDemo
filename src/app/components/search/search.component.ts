import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public keywords: string;
  public history: any[] = new Array();
  constructor( public storage: StorageService) { 
  }

  ngOnInit() {
    const searchList: any = this.storage.get('SearchHistory');
    if (searchList) { 
      this.history = searchList;
    }
  }
  check() {
    if (this.history.indexOf(this.keywords) === -1) {
      return true;
    }
  }
  doClickSearch() {
    if (this.check()) {
      this.history.push(this.keywords);
      this.storage.set('SearchHistory', this.history);
    }
    this.keywords = '';
  }

  doKeySearch(event) {
    if (event.keyCode === 13) {
      if (this.check()) {
        this.history.push(this.keywords);
        this.storage.set('SearchHistory', this.history);
      }
      this.keywords = '';
    }
  }

  deletHistory(key) {
    this.history.splice(key, 1);
    this.storage.set('SearchHistory', this.history);
  }

  deleteAll() {
    this.keywords = '';
    this.history = [];
    this.storage.remove('SearchHistory');
  }
}
