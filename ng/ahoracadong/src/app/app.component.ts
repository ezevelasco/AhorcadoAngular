import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ahorcadong';
  palabra: string = "";
  palabraOculta: string = this.palabra;

  ngOnInit(): void {
    this.ingresarPalabra();
  }

  creaTablero(arrPalabra: string[]){
    let tablero = "";
    arrPalabra.forEach(letra => {
        tablero = tablero + "<td> ? </td>";
    });
    return tablero;
}

  // Función que realiza y valida la entrada de palabra
  ingresarPalabra(): void {
    const ventana = prompt("¡Ingresa una palabra para adivinar!");
    const arrPalabra = ventana?.split("");

    // Checkeo q no sea vacía
    if (!arrPalabra || arrPalabra.length === 0) {
      this.ingresarPalabra();
      return;
    }

    // Checkeo que no entren numeros
    if(!/^[a-zA-Z]+$/.test(arrPalabra.join(""))){
    alert("Ingrese únicamente letras.");
      this.ingresarPalabra();
      return;
    }

    this.palabra = arrPalabra.join("");

   
    @ViewChild("tablero") tablero: ElementRef;
    document.getElementById("tablero").innerHTML = `
        <table class="table" border="1">
            <tr class="table-secondary">
                ${creaTablero(arrPalabra)}    
            </tr>    
        </table>
        `;
    return arrPalabra;
    
  }

  soloLetras(cadena: string): boolean {
    const pattern = new RegExp('[a-zA-Z]');

    const coincidencias = this.getAllIndexes(this.palabra || "", cadena).length;

    if (coincidencias === 0) {
      this.leyendaCoincidencia(0);
      return false;
    }

    this.leyendaCoincidencia(coincidencias);
    return true;
  }

  getAllIndexes(arr: string, val: string): number[] {
    const indexes: number[] = [];
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        indexes.push(i);
      }
    }

    return indexes;
  }

  buscarCoincidencia(letra: string): string {
    const coincidencias = this.getAllIndexes(this.palabra || "", letra);
    this.leyendaCoincidencia(coincidencias.length);

    let tablero = "";
    const pal = this.palabra.split("");

    if (coincidencias.length === 0) {
      for (let i = 0; i < this.palabra.length; i++) {
        if (this.palabra[i] !== "?") {
          tablero += "<td>" + this.palabra[i] + "</td>";
        } else {
          tablero += "<td>" + this.palabra[i] + "</td>";
        }
      }
    } else {
      for (let i = 0; i < pal.length; i++) {
        if (coincidencias.includes(i)) {
          pal[i] = letra;
        }
        tablero += "<td>" + pal[i] + "</td>";
      }
      this.palabra = pal.join("");
    }

    return tablero;
  }

  leyendaCoincidencia(coincidencias: number): void {
    const statusElement = document.getElementById("status");
    if (statusElement) {
      if (coincidencias > 0) {
        statusElement.innerHTML = `<p class="bg-success-subtle">Hubo ${coincidencias} coincidencias!!!</p>`;
      } else {
        statusElement.innerHTML = `<p class="bg-danger-subtle">No hubo coincidencias</p>`;
      }
    }
  }
}
