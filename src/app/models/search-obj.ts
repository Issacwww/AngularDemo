export class SearchObj {
    keyword: string;
    count: number;

    constructor(keyword: string) {
        this.keyword = keyword;
        this.count = 1;
    }

    eql(other: SearchObj) {
        return this.keyword === other.keyword;
    }
}
