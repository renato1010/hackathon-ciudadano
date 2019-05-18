import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacionComponent } from './autenticacion.component';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AmplifyModules, AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AutenticacionComponent', () => {
  let component: AutenticacionComponent;
  let fixture: ComponentFixture<AutenticacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [AutenticacionComponent],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
