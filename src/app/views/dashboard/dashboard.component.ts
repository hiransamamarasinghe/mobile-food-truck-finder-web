import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { FoodTruck, MapInfo } from './models';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { environment } from '../../../environments/environment';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  zoom = 12;
  currentLat: number = 0;
  currentLon: number = 0;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: any;
  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
  };
  profileForm: FormGroup;
  errorMessage: string = '';

  constructor(private chartsData: DashboardChartsData, private dashboardService: DashboardService, private changeDetectorRef: ChangeDetectorRef) {
    this.markers = [];
    this.profileForm = new FormGroup({
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      search: new FormControl(''),
      food: new FormControl('')
    });
  }

  public markers: MapInfo[];

  ngOnInit(): void {
    this.initCharts();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.currentLat = environment.testCoordinate.lat ?? position.coords.latitude;
        this.currentLon = environment.testCoordinate.lon ?? position.coords.longitude;
        //To show the error message only
        let distance = this.dashboardService.getDistance(this.currentLat, this.currentLon, environment.cityCoordinate.lat, environment.cityCoordinate.lon);
        if (distance > environment.cityCoordinate.maxDistance) {
          this.errorMessage = 'You are not in the city limit to find accurate results';
        }
        this.setFormValues(this.currentLat, this.currentLon, '');
        this.loadData(this.currentLat, this.currentLon, '');
      });
    }
  }

  setFormValues(latitude: number, longitude: number, food: string) {
    this.profileForm = new FormGroup({
      latitude: new FormControl(latitude),
      longitude: new FormControl(longitude),
      food: new FormControl(food)
    });
    this.center = {
      lat: latitude,
      lng: longitude,
    }
  }

  loadData(latitude: number, longitude: number, search: string) {
    this.dashboardService.getFoodTrucks(latitude, longitude, search).subscribe((foodTrucks: FoodTruck[]) => {
      if (foodTrucks.length > 0) {
        foodTrucks.forEach(ft => {
          this.markers.push({
            position: {
              lat: ft.latitude,
              lng: ft.longitude
            },
            title: ft.foodItems,
            label: {
              color: 'red',
              text: ft.Applicant
            },
            options: {
              animation: google.maps.Animation.DROP
            }
          });
        });
      }
      else {
        this.markers = [];
      }
    });
  }

  onClick() {
    let lat = parseFloat(this.profileForm.get('latitude')?.value);
    let lon = parseFloat(this.profileForm.get('longitude')?.value);
    let food = this.profileForm.get('food')?.value;

    if (lat != NaN && lon != NaN) {
      this.loadData(lat, lon, food);
      this.center = {
        lat: lat,
        lng: lon,
      }
    }
  }

  openInfo(marker: MapMarker, cont: any) {
    this.infoWindow.open(marker)
  }

  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });



  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }
}
