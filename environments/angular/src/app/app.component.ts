import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { createClient } from 'contentful-management';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  result: string = "Loading...";
  title = 'angular';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const client = createClient({
        accessToken: environment.CMA_ACCESS_TOKEN,
      });

      client.user.getCurrent()
        .then(() => {
          this.result = '✅ Success!';
        })
        .catch((err: Error) => {
          this.result = `🚫 Error: ${err.message}`;
        });
    }
  }
}
