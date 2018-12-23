import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import { SearchObj } from 'src/app/models/search-obj';

@Component(
    {selector: 'app-search', templateUrl: './search.component.html', styleUrls: ['./search.component.css']}
)
export class SearchComponent implements OnInit {
    public keyword: string;
    public searchObj: SearchObj;
    public history: any[] = new Array();
    constructor(public storage: StorageService) {}

    ngOnInit() {
        const searchList: any = this.storage.get('SearchHistory');
        if (searchList) {
            this.history = searchList;
        }
    }
    check() {
      let idx = -1;
      for (let _i = 0; _i < this.history.length; _i++) {
        if (this.searchObj.eql(this.history[_i])) {
          idx = _i;
        }
      }
      return idx;
    }
    // sort() {
    //   this.history = new Map([...this.history.entries()].sort((a, b) => b[1] - a[1]));
    // }
    doClickSearch() {
      if (!this.keyword) {
        return;
      }
      this.searchObj = new SearchObj(this.keyword);
      const idx = (this.check());
        if ( idx !== -1) {
            this.history[idx].count += 1;
        } else {
            this.history.push(this.searchObj);
        }
        this.history.sort((a, b) => b.count - a.count);
        this.storage.set('SearchHistory', this.history);
        this.keyword = null;
    }

    doKeySearch(event) {
      if (!this.keyword) {
        return;
      }
      this.searchObj = new SearchObj(this.keyword);
      const idx = (this.check());
      if (event.keyCode === 13) {
        if ( idx !== -1) {
          this.history[idx].count += 1;
        } else {
          this.history.push(this.searchObj);
        }
        
        this.history.sort((a, b) => b.count - a.count);
        console.log(this.history);
        
        this.storage.set('SearchHistory', this.history);
        this.keyword = null;
      }
    }

    deletHistory(key) {
      this.history.splice(key, 1);      
      this.storage.set('SearchHistory', this.history);
    }

    deleteAll() {
        this.keyword = '';
        this.history = [];
        this.storage.remove('SearchHistory');
    }
}
