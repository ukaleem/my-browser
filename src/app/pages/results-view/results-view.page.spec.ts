import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultsViewPage } from './results-view.page';

describe('ResultsViewPage', () => {
  let component: ResultsViewPage;
  let fixture: ComponentFixture<ResultsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
