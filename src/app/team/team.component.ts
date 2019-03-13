import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { User } from '../user';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  user: User;

  users: User[];

  teamSum: number;

  teamWeekly: number;

  teamRank: number;

  constructor( private statsService: StatsService ) { }

  getUser(): any {
    return this.statsService.getUser();
  }

  getUsers(user): void {
    this.statsService.getUsers(user)
      .subscribe(users => this.users = users)
  }

  getTeamSum(user): void {
    this.statsService.getTeamSum(user)
      .subscribe(total => this.teamSum = total)
  }

  getTeamWeekly(user): void {
    this.statsService.getTeamWeekly(user)
      .subscribe(teamWeekly => this.teamWeekly = teamWeekly)
  }

  getTeamRank(user): void {
    this.statsService.getTeamRank(user)
      .subscribe(teamRank => this.teamRank = teamRank)
  }

  ngOnInit() {
    this.getUser().subscribe( user => {
      this.user = user;
    this.getTeamSum(user);
    this.getTeamWeekly(user);
    this.getTeamRank(user);
    this.getUsers(user);
    });
  }

}
