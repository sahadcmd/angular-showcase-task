import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  constructor() { }
  saveDraft(data: any) {
    localStorage.setItem('userFormDraft', JSON.stringify(data));
  }

  getDraft(): any {
    const draftData = localStorage.getItem('userFormDraft');
    return draftData ? JSON.parse(draftData) : null;
  }

  clearDraft() {
    localStorage.removeItem('userFormDraft');
  }
}
