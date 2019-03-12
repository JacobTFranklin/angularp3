import { Component, OnInit } from '@angular/core';
import { Stat } from '../stat';
import { StatsService } from '../stats.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  stats: Stat[];

  user: User;

  idToken = this.auth.idToken;

  email: string;

  constructor(
    private statService: StatsService,
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthService
    ) { }

  getDecodedAccessToken(token: string): any {
      try{
          return jwt_decode(token);
      }
      catch(Error){
          return null;
      }
  }

  checkToken(idToken): any {
    let info = this.getDecodedAccessToken(idToken);
    this.email = info.email;
    console.log(this.email);
  }

  getUserById (): any {
    const uid = +this.route.snapshot.paramMap.get('uid');
    return this.statService.getOtherUser(uid);
  }

  getStats(user): void {    
    this.statService.getStats(user)
      .subscribe(stats => this.stats = stats)
  }

  deleteStat(stat): void {
    this.stats = this.stats.filter(s => s !== stat);
    this.statService.deleteStat(stat)
      .subscribe();
  }

  ngOnInit() {
    this.getUserById().subscribe( user => {
      this.user = user;
    this.getStats(user);
    this.checkToken(this.idToken);
    });
  }

}
