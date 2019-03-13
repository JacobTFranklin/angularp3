import { Component, OnInit, Input } from '@angular/core';
import { StatsService } from '../stats.service';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalMinutes: number;

  weeklyMinutes: number;

  teamSum: number;

  teamWeekly: number;

  rank: number;

  teamRank: number;

  user: User;

  constructor( private statsService: StatsService ) { }

  getUser(): any {
    return this.statsService.getUser();
  }

  getStatSum(): void {
    this.statsService.getStatSum()
      .subscribe(total => this.totalMinutes = total)
  }

  getWeeklyMinutes(): void {
    this.statsService.getStatsWeekly()
      .subscribe(weeklyMinutes => this.weeklyMinutes = weeklyMinutes)
  }

  getTeamSum(user): void {
    this.statsService.getTeamSum(user)
      .subscribe(total => this.teamSum = total)
  }

  getTeamWeekly(user): void {
    this.statsService.getTeamWeekly(user)
      .subscribe(teamWeekly => this.teamWeekly = teamWeekly)
  }

  getRank(): void {
    this.statsService.getRank()
      .subscribe(rank => this.rank = rank)
  }

  getTeamRank(user): void {
    this.statsService.getTeamRank(user)
      .subscribe(teamRank => this.teamRank = teamRank)
  }

  ngOnInit() {
    this.getStatSum();
    this.getWeeklyMinutes();
    this.getRank();
    this.getUser().subscribe( user => {
      this.user = user;
    this.getTeamSum(user);
    this.getTeamWeekly(user);
    this.getTeamRank(user);
    });
  }

}
