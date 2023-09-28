export function checkImg (url) {
    const imagen = new Image();
    imagen.onload = function () {
        return true;
    };
    imagen.onerror = function () {
        return false;
    };
    imagen.src = url;
}

export function splitNum(cadena) {
    // Dividir la cadena en función del guión "-"
    const numerosSeparados = cadena.split('-');
  
    // Convertir las partes separadas en números enteros
    const numero1 = parseInt(numerosSeparados[0].trim(), 10);
    const numero2 = parseInt(numerosSeparados[1].trim(), 10);
  
    return [numero1, numero2];
  }

