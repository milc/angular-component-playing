import { Component, OnInit } from '@angular/core';
import { Domain } from '../domain';
import { DOMAINS } from '../mock-domains';

@Component({
  selector: 'app-filtered-select',
  templateUrl: './filtered-select.component.html',
  styleUrls: ['./filtered-select.component.scss']
})
export class FilteredSelectComponent implements OnInit {

  domains = DOMAINS;
  filteredDomains = [];
  selectedDomain: Domain;
  query: string;
  private storageName = 'filtered-select-state';

  constructor() {
  }

  ngOnInit() {
    this.filteredDomains = this.domains;

    const storage = this.getStorage();
    if(storage.query && storage.query !== '') {
      this.query = storage.query;
    }
    if(storage.filteredDomains && storage.filteredDomains !== '') {
      this.filteredDomains = storage.filteredDomains;
    }
  }

  onSelect(domain: Domain): void {
    this.selectedDomain = domain;
  }

  onQuery(): void {
    const query = this.query;
    let hasMatch = false;

    this.filteredDomains = this.domains.map(domain => {
      if(domain.name.includes(query)) {
        domain.display = true;
        hasMatch = true;
      } else {
        domain.display = false;
      }
      return domain;
    });

    if(hasMatch) {
      this.updateStorage();
    }
  }

  getStorage(): any {
    if (window.localStorage) {
      const storage = JSON.parse(localStorage.getItem(this.storageName));
      if(storage && storage !== '') {
        return storage;
      }
      return false;
    }
    return null;
  }

  updateStorage(): void {
    if (window.localStorage) {
      localStorage.setItem(this.storageName, JSON.stringify({query: this.query, filteredDomains: this.filteredDomains}));
    }
  }
}