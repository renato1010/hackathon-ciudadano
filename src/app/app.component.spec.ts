import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { AmplifyAngularModule, AmplifyModules, AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        AmplifyAngularModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule
      ],
      declarations: [AppComponent, NavComponent],
      providers: [
        {
          provide: AmplifyService,
          useFactory: () => {
            return AmplifyModules({ Auth });
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /*
  it(`should have as title 'Ciudadano 2019'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Ciudadano 2019');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ng-amplify!');
  });
*/
});
