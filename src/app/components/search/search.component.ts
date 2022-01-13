import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/interfaces/ApiRespt.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  isLoading = false;
  persons: Person[] = [];
  pagination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  currentPage = 1;

  searchTerm = '';

  private totalPage = 0;

  private loadDataSub: Subscription;
  private pageData: Subscription;
  private term = '';
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.loadDataSub.unsubscribe;
    this.pageData?.unsubscribe
  }

  ngOnInit(): void {
    this.term = this.route.snapshot.paramMap.get('term') || '';
    this.loadData();
  }



  loadData() {
    this.isLoading = true;
    this.loadDataSub = this.apiService.getPersonSearch(this.term).subscribe(resp => {
      this.persons = resp.results;
      this.totalPage = resp.info.pages;
      this.isLoading = false;
    });
  }

  prevPagination() {
    if (this.currentPage == 1) { return; }
    const end = this.pagination[0];
    let start = end - 9;
    this.currentPage = start;
    this.pagination = [start, ...this.addPages(start)];
    console.log(start);
    this.goPage(start);
  }

  nextPagination() {
    let start = this.pagination[9];
    if (start >= this.totalPage) { return; }
    this.currentPage = this.pagination[9];
    this.goPage(start);
  }

  goPage(page: number) {
    this.isLoading = true;
    const position = this.pagination.findIndex((value) => value === page);
    this.currentPage = page;
    if (position > 4) {
      if (page <= this.totalPage) {
        this.pagination = [page, ...this.addPages(page)];
      }
    }


    this.loadDataSub = this.apiService.getPersonSearch(this.term, page).subscribe(resp => {
      this.persons = resp.results;
      this.isLoading = false;
    });
  }

  firstPage() {
    this.loadData();
    this.pagination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.currentPage = 1;
  }

  lastPage() {
    const start = this.totalPage - 10;
    this.currentPage = this.totalPage;
    this.pagination = [start, ...this.addPages(start + 1)];
    this.isLoading = true;
    this.loadDataSub = this.apiService.getPersonPage(this.totalPage).subscribe(resp => {
      this.persons = resp.results;
      this.isLoading = false;
    });

  }

  addPages(initNumber: number) {
    let pages = [];
    let count = initNumber;
    for (let index = 0; index < 9; index++) {
      count++;
      if (count <= this.totalPage) {
        pages.push(count);
      }
    }
    return pages;
  }

}
