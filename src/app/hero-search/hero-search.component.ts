import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Hero } from '../hero/hero.component';
import { Subject } from 'rxjs/Subject';
import { HeroSearchService } from '../service/hero-search.service';
import 'rxjs/Rx'

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  private heroes = new Observable<Hero[]>();
  private searchTerm = new Subject<string>();
  constructor(private router: Router, private heroSearchService: HeroSearchService) { }
  search(term:string): void {
    this.searchTerm.next(term)
  }
  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link)
  }
  ngOnInit(): void {
    this.heroes = this.searchTerm
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([])
      })
  }
}
