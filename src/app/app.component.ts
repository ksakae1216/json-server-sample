import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DataObj {
  id:number,
  name: string,
  position: string,
  createdAt: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  soccerData = '';
  baseballData = '';

  constructor(private http: HttpClient){}

  ngOnInit():void {
    this.getData('soccer');
    this.getData('baseball');
  }

  getData(category: string):void {
    let ret = '';
    this.http.get<DataObj[]>(`/api/${category}`).subscribe((row) => {
      row.forEach((data) => {
        ret += `背番号: ${data.id}, 名前： ${data.name}, ボジション: ${data.position}, データ作成日: ${data.createdAt}\n`
      });

      if (category === 'soccer') {
        this.soccerData = ret;
      } else {
        this.baseballData = ret;
      }
    });
  }
}
