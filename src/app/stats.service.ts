import { Injectable } from '@angular/core';
import { Stat } from './stat';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(
    private http: HttpClient,
    public auth: AuthService
  ) {

     this.myHeaders.append('Content-Type', 'application/json');
     this.myHeaders.append('Authorization', this.idToken);
   }


  idToken = this.auth.idToken;

  private myHeaders = new HttpHeaders();

  

  private statsUrl = '/api/stats';

  private statsWeeklyUrl = '/api/stats/weekly';

  private statsTotalUrl = '/api/stats/sum';

  private otherStatsUrl = '/api/stats/other';

  private teamSumUrl = '/api/stats/team/sum';

  private teamWeeklyUrl = '/api/stats/team/weekly';

  private rankUrl = '/api/rank';

  private rankTeamUrl = '/api/rank/team';

  private usersUrl = '/api/users';

  private usersTeamUrl = '/api/users/team';

  private otherUserUrl = '/api/users/other';



  getStats (user: User): Observable<Stat[]> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
      var params = new HttpParams()
        .set("email", user.email);
    return this.http.get<Stat[]>(this.statsUrl, { headers: locHeads, params: params});
  }

  getStatsById (user: User): Observable<Stat[]> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
      var params = new HttpParams()
        .set("uid", user.uid);
    return this.http.get<Stat[]>(this.otherStatsUrl, { headers: locHeads, params: params});
  }

  getStatSum (): Observable<any> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
    return this.http.get<any>(this.statsTotalUrl, { headers: locHeads});
  }

  getStatsWeekly (): Observable<any> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
    return this.http.get<any>(this.statsWeeklyUrl, { headers: locHeads});
  }

  getTeamSum (user: User): Observable<any> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
    var params = new HttpParams()
      .set("user", user.team);
    return this.http.get<any>(this.teamSumUrl, { headers: locHeads, params: params});
  }

  getTeamWeekly (user: User): Observable<any> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
    var params = new HttpParams()
      .set("user", user.team);
    return this.http.get<any>(this.teamWeeklyUrl, { headers: locHeads, params: params});
  }

  getRank (): Observable<any> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
    return this.http.get<any>(this.rankUrl, { headers: locHeads});
  }

  getTeamRank (user: User): Observable<any> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
    var params = new HttpParams()
      .set("user", user.team);
    return this.http.get<any>(this.rankTeamUrl, { headers: locHeads, params: params});
  }

  getUser (): Observable<User> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'applicaton/json',
      'Authorization' : 'bearer ' + this.idToken,
      });
    return this.http.get<User>(this.usersUrl, { headers: locHeads});
  }

  getUsers (user: User): Observable<User[]> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
    var params = new HttpParams()
      .set("user", user.team);
    return this.http.get<User[]>(this.usersTeamUrl, { headers: locHeads, params: params});
  }

  getOtherUser (uid: any): Observable<User> {
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
    var params = new HttpParams()
      .set("user", uid);
    return this.http.get<User>(this.otherUserUrl, { headers: locHeads, params: params});
  }

  addStat (stat: Stat): Observable<Stat> {
    return this.http.post<Stat>(this.statsUrl, stat, httpOptions);
  }

  deleteStat (stat: any): Observable<Stat>{
    var locHeads = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + this.idToken
      });
    var params = new HttpParams()
      .set("stat", stat.id);
    return this.http.delete<Stat>(this.statsUrl, {headers: locHeads, params: params});
  }


}

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json',
     })
};