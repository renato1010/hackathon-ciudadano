import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AmplifyService } from 'aws-amplify-angular';
import { Subscription } from 'rxjs';
import { FloatLabelType } from '@angular/material';
import { APIService } from '../../API.service';

type MediaType = 'video' | 'imagen';
const FILE_PREFIX = 'https://s3.us-east-2.amazonaws.com/hackathon-dev/public/';
@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss']
})
export class UploadMediaComponent implements OnInit, OnDestroy {
  uploadMediaForm: FormGroup;
  uploadFile: File;
  user: any;
  state: any;
  mediaSubscription: Subscription;
  uploadError: any;
  labelOption: FloatLabelType = 'auto';
  isFileOk = false;
  validaciones: { [key: string]: boolean };
  errorMessage: string;

  constructor(private amplifyService: AmplifyService, private api: APIService) {}

  async ngOnInit() {
    this.createUploadMediaForm();
    try {
      const authUser = await this.amplifyService
        .auth()
        .currentAuthenticatedUser({ bypassCache: false });
      if (authUser) {
        this.user = authUser;
        console.log('user: ', this.user);
      }
    } catch (e) {
      console.error('error-auth', e);
    }
    // this.mediaSubscription = this.amplifyService.authStateChange$.subscribe(authState => {
    //   this.user = authState.user;
    //   console.log('user: ', this.user);
    //   this.state = authState.state;
    //   console.log('state: ', this.state);
    // });
  }

  createUploadMediaForm() {
    this.uploadMediaForm = new FormGroup({
      file: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
      mediaType: new FormControl('', Validators.required)
    });
  }
  get file(): AbstractControl {
    return this.uploadMediaForm.get('file');
  }
  get titulo(): AbstractControl {
    return this.uploadMediaForm.get('titulo');
  }
  get descripcion(): AbstractControl {
    return this.uploadMediaForm.get('descripcion');
  }
  // get url(): AbstractControl {
  //   return this.uploadMediaForm.get('url');
  // }
  get mediaType(): AbstractControl {
    return this.uploadMediaForm.get('mediaType');
  }
  ngOnDestroy(): void {
    // tslint:disable-next-line
    this.mediaSubscription && this.mediaSubscription.unsubscribe();
  }

  async onUploadMedia() {
    if (this.uploadMediaForm.invalid) {
      return;
    }
    Object.keys(this.validaciones).forEach(value => {
      if (value === 'isVideoOk' && this.mediaType.value === 'video') {
        if (this.validaciones[value] === false) {
          this.errorMessage = 'Revisa tu archivo de video';
        }
      } else if (value === 'isImageOk' && this.mediaType.value === 'imagen') {
        if (this.validaciones[value] === false) {
          this.errorMessage = 'Revisa tu archivo de imagen';
        }
      } else if (value === 'isSizeOk') {
        if (this.validaciones[value] === false) {
          this.errorMessage = 'El tamano de tu archivo es muy grande';
        }
      } else {
        this.errorMessage = undefined;
      }
    });
    this.isFileOk = this.errorMessage === undefined;
    if (!this.isFileOk) {
      return;
    }
    try {
      const storageRes: { [key: string]: string } = await this.amplifyService
        .storage()
        .put(this.file.value, this.uploadFile, {
          contentType: this.uploadFile.type
        });
      console.log('res-async: ', storageRes);
      // si se guardo en Storage = ok; proceder a GraphQL mutation
      if (storageRes) {
        this.createMediaMutation(storageRes);
      }
    } catch (e) {
      console.error('error-storage: ', e);
    }
  }
  onFileChange(event): void {
    const formatosAceptadosVideo = ['video/mp4'];
    const formatosAceptadosImagenes = ['image/png', 'image/jpeg', 'image/jpg'];
    const file = event.target.files[0];
    console.log('file: ', file);
    if (file) {
      this.file.setValue(file.name);
    }
    const isVideoOk = !!file && formatosAceptadosVideo.includes(file.type);
    const isImageOk = !!file && formatosAceptadosImagenes.includes(file.type);
    const isSizeOk = !!file && Math.floor(file.size / 1000000) <= 10;
    this.uploadFile = (isVideoOk || isImageOk) && isSizeOk && file;
    this.validaciones = { isVideoOk, isImageOk, isSizeOk };
  }
  async createMediaMutation(storage) {
    const filename: string = storage.key;
    const mutationInputObj = {
      titulo: this.titulo.value,
      descripcion: this.descripcion.value || '',
      url: `${FILE_PREFIX}${filename}`,
      fecha: new Date().toISOString(),
      likes: 0,
      dontlikes: 0,
      userId: this.user.attributes.sub || '',
      mediaType: this.mediaType.value,
      username: this.user.username || ''
    };
    try {
      const mutationResult = await this.api.CreateMedia(mutationInputObj);
      console.log('Mutation-result: ', mutationResult);
    } catch (e) {
      console.error('Mutation-Error: ', e);
    }
  }
}
