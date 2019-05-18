import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { NavComponent } from './nav.component';
import { ChildrenOutletContexts } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AmplifyModules, AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule
      ],
      providers: [
        {
          provide: ChildrenOutletContexts,
          useClass: ChildrenOutletContexts
        },
        {
          provide: AmplifyService,
          useFactory: () => {
            return AmplifyModules({ Auth });
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
