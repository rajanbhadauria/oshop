import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

  observableCategories$: Observable<any>;
  categoryRef: AngularFireList<any>;
  categories: Observable<any[]>;
  category: Observable<any>;

  constructor(private db: AngularFireDatabase) {

    this.observableCategories$ = this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges();

  }

  getAll() {
    return this.observableCategories$.map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}
