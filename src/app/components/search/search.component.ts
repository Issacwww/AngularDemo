import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component(
    {selector: 'app-search', templateUrl: './search.component.html', styleUrls: ['./search.component.css']}
)
export class SearchComponent implements OnInit {
    public keywords: string;
    public history: any = new Map<string, number>();
    constructor(public storage: StorageService) {}

    ngOnInit() {
        const searchList: any = this
            .storage
            .get('SearchHistory');
        if (searchList) {
            this.history = searchList;
        }
    }
    sort() {
      this.history = new Map([...this.history.entries()].sort((a, b) => b[1] - a[1]));
    }
    doClickSearch() {
        if (this.history.has(this.keywords)) {
            this.history[this.keywords] += 1;
        } else {
            this.history[this.keywords] = 1;
        }
        this.sort();
        this.storage.set('SearchHistory', this.history);
        this.keywords = '';
    }

    doKeySearch(event) {
      if (event.keyCode === 13) {
        if (this.history.has(this.keywords)) {
          this.history[this.keywords] += 1;
        } else {
          this.history[this.keywords] = 1;
        }
        this.sort();
        this.storage.set('SearchHistory', this.history);
        this.keywords = '';
      }
    }

    deletHistory(key) {
        this.history.splice(key, 1);
        this.storage.set('SearchHistory', this.history);
    }

    deleteAll() {
        this.keywords = '';
        this.history = new Map();
        this.storage.remove('SearchHistory');
    }
}
