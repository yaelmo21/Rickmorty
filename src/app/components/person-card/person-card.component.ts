import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../interfaces/ApiRespt.interface';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {

  @Input() person: Person;

  constructor() { }

  ngOnInit(): void {
  }


}
