import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Showcase-task';

  constructor() {}

  ngOnInit() {
    // To check the Internet Connectivity
    window.addEventListener('online', () => {
      alert('Network connection has been restored.');
    });

    window.addEventListener('offline', () => {
      alert('Network connection lost. Please check your internet connection.');
    });
  }
}
