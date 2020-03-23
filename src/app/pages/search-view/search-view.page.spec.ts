import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchViewPage } from './search-view.page';

describe('SearchViewPage', () => {
  let component: SearchViewPage;
  let fixture: ComponentFixture<SearchViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
