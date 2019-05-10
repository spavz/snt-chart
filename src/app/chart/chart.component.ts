import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  items: Observable<any[]>;
  DB = [];
  Nodes = [];
  selectedNode = undefined;
  SensorTypes = [];
  sensorDataMap = new Map();
  sensorDataLayout = new Map();
  sensorDataStats = new Map();
  sensorDataCurrent = new Map();

  constructor(public db: AngularFirestore) {

    interval(1000).subscribe(x => {
      this.DB.push({
        nodeId: 1,
        Timestamp: (new Date()),
        sensors: {
          temp: 5 * Math.random(),
          humid: 5 * Math.random()
        }
      })
      this.DB.push({
        nodeId: 3,
        Timestamp: (new Date()),
        sensors: {
          temp: 5 * Math.random(),
          humid: 5 * Math.random()
        }
      })
      this.setTypes();
    })
    this.items = this.db.collection('sensors' //, ref => ref
      // .orderBy('Timestamp')
      // .limit(3)
    ).valueChanges().pipe(
      tap(x => {

      })
    )
  }

  setTypes() {
    this.Nodes = Array.from(new Set(this.DB.map(x => x.nodeId)));
    const _set = new Set();
    this.DB
      .map(x => Object.keys(x.sensors)
        .map(s => _set.add(s))
      )
    this.SensorTypes = Array.from(_set);
    this.SensorTypes.map(x => this.setSensorData(x))
    console.log('SensorTypes', this.SensorTypes);

  }

  getTime(sensorType) {
    const d = new Date()//(new Date()).getMinutes() + ':'+ (new Date()).getSeconds();
    if (!this.sensorDataMap.get(sensorType)) {
      return [d]
    }
    this.sensorDataMap.get(sensorType)[0].x.push(d)
    return this.sensorDataMap.get(sensorType)[0].x;
  }

  setSensorData(sensorType) {
    const data = []
    this.DB
      .filter(x => (x.nodeId === this.selectedNode) && x.sensors[sensorType])
      .map(x => data.push(x.sensors[sensorType]))
    this.sensorDataMap.set(sensorType, [{
      x: this.getTime(sensorType),
      y: data,
      averageY: (data.reduce(function (a, b) { return a + b; }, 0) / (data.length)),
      line: {
        color: Colors.rgba[this.Nodes.indexOf(this.selectedNode)],
        width: 2
      }
    }])
    this.sensorDataStats.set(sensorType, this.sensorDataMap.get(sensorType)[0].averageY)
    this.sensorDataCurrent.set(sensorType, this.sensorDataMap.get(sensorType)[0].y[
      this.sensorDataMap.get(sensorType)[0].y.length - 1
    ])

    this.sensorDataLayout.set(sensorType, {
      margin: { t: 0 },
      width: 800,
      height: 500,
      title: {
        text: sensorType,
      },
      xaxis: {
        title: {
          text: 'Time Elapsed',
        },
      },
      yaxis: {
        title: {
          text: sensorType,
        }
      }
    })
  }

  ngOnInit() {

  }

}

class Colors {
  static rgba = [
    'rgba(255,0,0,1)',
    'rgba(0,255,0,1)',
    'rgba(0,0,255,1)',
    'rgba(255,255,0,1)',
    'rgba(0,255,255,1)',
    'rgba(255,0,255,1)',
    'rgba(0,0,0,1)',
    'rgba(255,0,0,1)',
    'rgba(0,255,0,1)',
    'rgba(0,0,255,1)',
    'rgba(255,255,0,1)',
    'rgba(0,255,255,1)',
    'rgba(255,0,255,1)',
    'rgba(0,0,0,1)',
    'rgba(255,0,0,1)',
    'rgba(0,255,0,1)',
    'rgba(0,0,255,1)',
    'rgba(255,255,0,1)',
    'rgba(0,255,255,1)',
    'rgba(255,0,255,1)',
    'rgba(0,0,0,1)',
    'rgba(255,0,0,1)',
    'rgba(0,255,0,1)',
    'rgba(0,0,255,1)',
    'rgba(255,255,0,1)',
    'rgba(0,255,255,1)',
    'rgba(255,0,255,1)',
    'rgba(0,0,0,1)',
    'rgba(255,0,0,1)',
    'rgba(0,255,0,1)',
    'rgba(0,0,255,1)',
    'rgba(255,255,0,1)',
    'rgba(0,255,255,1)',
    'rgba(255,0,255,1)',
    'rgba(0,0,0,1)',
  ]
}
