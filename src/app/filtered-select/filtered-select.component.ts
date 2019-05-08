import { Component, OnInit, Input } from '@angular/core';
import { Domain } from '../domain';
import { DOMAINS } from '../mock-domains';

@Component({
  selector: 'app-filtered-select',
  templateUrl: './filtered-select.component.html',
  styleUrls: ['./filtered-select.component.scss']
})
export class FilteredSelectComponent implements OnInit {

  private domains = DOMAINS;
  private storageName = 'filtered-select-state';
  filteredDomains: Domain[] = null;
  selectedDomain: Domain = null;
  @Input() query: string = '';

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
    if(storage.selectedDomain && storage.selectedDomain !== '') {
      this.selectedDomain = storage.selectedDomain;
    } else if(this.selectedDomain === null) {
      this.selectedDomain = this.filteredDomains[0];
    }

    this.filterHandler();
  }

  onSelectChange(event: any): void {
    for(const target of event.target) {
      if(target.selected === true) {
        this.updateSelectedDomain(JSON.parse(target.value));
        return;
      }
    }
  }

  updateSelectedDomain(domain: Domain): void {
    this.selectedDomain = domain;
    this.updateStorage();
  }

  onQuery(): void {
    const query = this.query;
    let hasMatch = false;

    this.filteredDomains = this.domains.filter(domain => {

      let regmatch = null;

      try {
        const regxp = new RegExp(query); // query.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&')
        regmatch = domain.name.match(regxp);
      } catch(err) {}

      if(domain.name.includes(query) || (regmatch !== null && regmatch.length > 0)) {
        domain._display = true;
        hasMatch = true;
        return domain;
      } else {
        domain._display = false;
      }
    });

    this.filterHandler();

    if(hasMatch) {
      this.updateStorage();
    }
  }

  resetQuery(): void {
    this.query = '';
    this.filteredDomains = this.domains.filter(domain => {
      domain._display = true;
      return domain;
    });

  }

  filterHandler(): void {

    // If one result, select it
    if(this.filteredDomains.length === 1) {
      const result = this.filteredDomains.filter((domain: Domain) => {
        if(domain._display === true) {
          return domain;
        }
      })[0];

      if(typeof result === 'object') {
        this.selectedDomain = result;
      }
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

  // TODO: cookie fallback
  updateStorage(): void {
    if (window.localStorage) {
      localStorage.setItem(this.storageName, JSON.stringify({
        query: this.query,
        selectedDomain: this.selectedDomain,
        filteredDomains: this.filteredDomains
      }));
    }
  }
}
