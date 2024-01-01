import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BananaComponent } from '../banana/banana.component';
import { Banana } from '../banana/banana.types';
import { BananaService } from '../banana.service';

@Component({
  selector: 'app-bananas',
  standalone: true,
  imports: [
    CommonModule,
    BananaComponent,
  ],
  template: `
    <section>
      <form class="search-bar">
        <input type="text" placeholder="Search..." #filter (input)="filterResults(filter.value)">
      </form>
    </section>

    <section class="results">
      <app-banana
      *ngFor="let banana of filteredBananaList"
      [banana]="banana">
      </app-banana>
    </section>
  `,
  styleUrl: './bananas.component.css'
})
export class BananasComponent {
  bananaList: Banana[] = [];
  bananaService: BananaService = inject(BananaService);
  filteredBananaList: Banana[] = [];

  constructor() {
    this.bananaService.getAllBananas().then((bananaResults: Banana[]) => {
      this.bananaList = bananaResults;
      this.filteredBananaList = bananaResults;
    });
  }

  filterResults(text: string) {
      if (!text) {
        this.filteredBananaList = this.bananaList;
        return;
      }

      this.filteredBananaList = this.bananaList.filter(
        banana => banana?.name.toLowerCase().includes(text.toLowerCase())
      );
    }

}
