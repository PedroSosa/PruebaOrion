import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFireDatabase) {}

  setData(route: string, obj: object) {
    return this.db.database.ref(route).set(obj);
  }

  pushData(route: string, obj: object) {
    return this.db.database.ref(route).push(obj);
  }

  getData(route: string) {
    return this.db.list(route).valueChanges();
  }
  deleteAddress(route: string) {
    return this.db.list(route).remove();
  }
}
