import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  sideNavIcons:string[] = ['home','dashboard','contact_support'];
  sideNavTabs:string[] = ['Home','DashBoard','Info'];
  sideNavRouter:string[] = ['home','dashboard','info']
  selectedTab:number = 0 ;
  ngOnInit(): void {
    this.onTabSelect(0);
  }

  async onTabSelect(e:number){
    await this.router.navigate([`../${this.sideNavRouter[e]}`]);
    this.selectedTab = e;
  }

}
