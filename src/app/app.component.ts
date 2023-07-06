import { RateService } from './../services/rate.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-converter-uah';
  usdRate: number = 0
  eurRate: number = 0
  leftInput: number = 0
  rightInput: number = 0
  rates: any = {};
  selectedOptionFirst: string = "UAH"
  selectedOptionSecond: string = "UAH"
  options: any = [
    { name: "option1", value: "UAH" },
    { name: "option2", value: "USD" },
    { name: "option3", value: "EUR" }
  ]
  ngOnInit(): void {
    this.rateService.getRates("USD").subscribe((response) => {
      let data: any = response
      this.usdRate = Math.floor(data.rates["UAH"] * 100) / 100
    });
    this.rateService.getRates("EUR").subscribe((response) => {
      let data: any = response
      this.eurRate = Math.floor(data.rates["UAH"] * 100) / 100
    });
  }
  changeLeft(): void {
    this.rateService.getRates(this.selectedOptionFirst).subscribe((response) => {
      let data: any = response
      let multiplier: any = data.rates[this.selectedOptionSecond]
      this.rightInput = Math.floor((this.leftInput * multiplier) * 100) / 100
    });
  }
  changeRight(): void {
    this.rateService.getRates(this.selectedOptionSecond).subscribe((response) => {
      let data: any = response
      let multiplier: any = data.rates[this.selectedOptionFirst]
      this.leftInput = Math.floor((this.rightInput * multiplier) * 100) / 100
    });
  }
  constructor(private rateService: RateService) {

  }
}
