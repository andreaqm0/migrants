export function getRelativeTime(date: string) {
    const fecha = new Date(date);
    const fechaActual = new Date();

    const diferenciaEnMillis = Math.abs(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()) - Date.UTC(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate()));
    const segundos = Math.floor(diferenciaEnMillis / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30);
    const años = Math.floor(meses / 12);

    if (años > 0) {
        return `${años} año${años !== 1 ? 's' : ''} atrás`;
      } else if (meses > 0) {
        return `${meses} mes${meses !== 1 ? 'es' : ''} atrás`;
      } else if (dias > 0) {
        return `${dias} día${dias !== 1 ? 's' : ''} atrás`;
      } else if (horas > 0) {
        return `${horas} hora${horas !== 1 ? 's' : ''} atrás`;
      } else if (minutos > 0) {
        return `${minutos} minuto${minutos !== 1 ? 's' : ''} atrás`;
      } else {
        return 'Hace unos segundos';
      }
}