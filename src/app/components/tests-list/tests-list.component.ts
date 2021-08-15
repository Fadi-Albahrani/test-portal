import { TestCategory } from './../../interfaces/test-category';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.css']
})
export class TestsListComponent implements OnInit {

  // questionsList: Question[] = [];

  hideTestMenu: boolean = true;
  

  testCategories: TestCategory[] = [
    {categoryName: "sports", CategoryId: 21},
    {categoryName: "Art", CategoryId: 25},
    {categoryName: "Histroy", CategoryId: 23},
    {categoryName: "Politics", CategoryId: 24},
    {categoryName: "Animals", CategoryId: 27},
    {categoryName: "Vehicles", CategoryId: 28},
  
  ]



  constructor() {

  }

  ngOnInit() {


  }

  startTest(){
    alert("The exam about to start !")
    this.hideTestMenu = false;
    
  }

}
