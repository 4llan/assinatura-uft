import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Title } from "@angular/platform-browser";
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-assinatura',
  templateUrl: './assinatura.component.html',
  styleUrls: ['./assinatura.component.css']
})
export class AssinaturaComponent {

  assinatura_tipo = 'individual';
  titulo = 'Assinatura de e-mail institucional UFT'

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private titleService: Title, private snackBar: MatSnackBar) {
    this.titleService.setTitle(this.titulo);
  }

  copiarAssinatura() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      let assinatura = document.getElementById('assinatura')?.innerHTML;
      e.clipboardData?.setData('text/html', (assinatura!));
      e.preventDefault();
      document.removeEventListener('copy', null!);
    });
    document.execCommand('copy');
    this.snackBar.open('Assinatura copiada com sucesso', 'OK', {
      duration: 5000
    });
  }

}
