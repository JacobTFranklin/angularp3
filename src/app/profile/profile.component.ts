import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( 
    private statsService: StatsService,
    private route: ActivatedRoute,
    private location: Location
     ) { }

  user: User;

  getUser(): void {
    this.statsService.getUser()
      .subscribe(user => this.user = user)
  }

  ngOnInit() {
    this.getUser();
  }

}
