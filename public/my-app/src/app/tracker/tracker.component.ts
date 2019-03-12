import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { Stat } from '../stat';
import { User } from '../user';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  stats: Stat[];

  user: User;

  constructor(private statsService: StatsService) { }

 

  getUser(): void  {
    this.statsService.getUser()
      .subscribe(user => this.user = user)
  }

  add(date: string, minutes: number, email: string): void {
    this.statsService.addStat({date, minutes, email} as Stat)
      .subscribe(stat => {
        this.stats.push(stat);
      });
  }

  ngOnInit() {
    this.getUser();
  }

}
