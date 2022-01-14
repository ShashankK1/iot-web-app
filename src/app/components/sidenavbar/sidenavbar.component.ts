import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  sideNavIcons:string[] = ['home','dashboard','contact_support'];
  sideNavTabs:string[] = ['Home','DashBoard','Info'];
  sideNavRouter:string[] = ['home','dashboard','info']
  selectedTab:number = 0 ;
  ngOnInit(): void {
  }

  async onTabSelect(e:number){
    await this.router.navigate([`../${this.sideNavRouter[e]}`]);
    this.selectedTab = e;
  }

}
