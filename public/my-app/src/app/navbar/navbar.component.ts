import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { StatsService } from '../stats.service';
import { User } from '../user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor ( 
    private statsService: StatsService,
    public auth: AuthService ) { 
    auth.handleAuthentication();
  }

  getUser(): void {
    this.statsService.getUser()
      .subscribe(user => this.user = user)
  }

  ngOnInit() {
    this.getUser();
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewTokens();
    }
  }

}
