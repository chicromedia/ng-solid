import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nsHumanize'
})
export class NsHumanizePipe implements PipeTransform
{

  transform(time: string): string
  {
    const date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
    const diff = (((new Date()).getTime() - date.getTime()) / 1000);
    const day_diff = Math.floor(diff / 86400);

    switch ( true )
    {
      case diff < 60:
        return "justo ahora";
      case diff < 120:
        return "hace un minuto";
      case  diff < 3600:
        return `hace ${ Math.floor(diff / 60) } minutos`;
      case diff < 7200:
        return "hace una hora"
      case diff < 86400:
        return `hace ${ Math.floor(diff / 3600) } horas`;
      case day_diff == 1:
        return "Ayer"
      case  day_diff < 7:
        return `hace ${ day_diff } días`;
      case day_diff < 31:
        return `hace ${ Math.ceil(day_diff / 7) } semanas`;
      default:
        return time;
    }
  }

}
