import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public graph = {
    data: [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16]
    }],
    layout: {
      margin: { t: 0 },
      yaxis: { range: [0, 6] }
    }
  };

  constructor() { }

  ngOnInit() {

    interval(1000).subscribe(x => {
      this.graph.data[0].y.pop()
      this.graph.data[0].y.unshift(5 * Math.random())

    })
  }

}
