import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero/hero.component';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  private heroes: Hero[];
  private selectedHero: Hero;
  constructor(private heroService: HeroService, private router: Router) { }
  getHeroes() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes)
  }
  ngOnInit() {
    this.getHeroes()
  }
  add(name: string): void {
    let lname = name.trim();
    if(!lname){return;}
    this.heroService.create(lname)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      })
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if(this.selectedHero === hero){this.selectedHero = null}
      })
  }
  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id])
  }
}
