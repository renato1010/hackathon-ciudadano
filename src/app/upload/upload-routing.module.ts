import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadMediaComponent } from './upload-media/upload-media.component';

const routes: Routes = [{ path: '', component: UploadMediaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {}
