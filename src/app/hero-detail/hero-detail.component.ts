import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero/hero.component';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  private hero: Hero;
  constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params.id))
      .subscribe(hero => this.hero = hero)
  }
  save() {
    this.heroService.updata(this.hero)
      .then(() => this.goBack())
  }
  goBack() {
    this.location.back();
  }
}
