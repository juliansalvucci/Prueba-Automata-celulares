/**EL JUEGO DE LA VIDA **/

class CellularAutomata{
    constructor(size, ctx, cells){  //Se define el contexto del canvas.
        this.size = size;  
        this.ctx = ctx;
        this.cells = cells ? cells : []; //Si cells es undefined, se crea un array vacío.
    }


    create(){  //Se crean las células.
        for(let x = 0; x < this.size; x++){
            let row = [];
            for(let y =  0; y < this.size; y++){
                const alive = Math.random() < 0.5; //Se crea una célula viva o muerta.
                row.push(alive);
            }
            this.cells.push(row);
        }
    }

    next(){ //Método que imprime y evalua.
        this.print(); 
        this.evaluate();
    }

    print(){
        this.ctx.clearRect(0, 0, this.size, this.size); //Borrar canvas.
        for(let x = 0; x < this.size; x++){ //Rellenar pixel por pixel.
            for(let y = 0; y < this.size; y++){  
                if(this.cells[x][y])
                   this.ctx.fillStyle="black"; //Si es viva, pintar.
                else
                   this.ctx.fillStyle="white";

                this.ctx.fillRect(x,y,1,1); //pintar un pixel 1x1.
            }
        }
    }

    evaluate(){
        let cellsAux = new Array(100).fill("").map(() => new Array(100).fill(false)); //Array de 100 elementos, cada posición con un array de 100 elementos. contiene un array de 100 elementos. 

        for(let x = 0; x < this.size; x++){
            for(let y = 0; y < this.size; y++){
                let livingNeighbor = 0;

                /**CONJUNTO DE VECINOS**/

                //1
                if(x>0 && y>0) //No está en el borde superior izquierdo.
                if(this.cells[x-1][y-1])
                   livingNeighbor++; //la célula de la izquierda arriba está viva.

                //2
                if(y>0)   
                if(this.cells[x][y-1]) //No está en el borde superior.
                   livingNeighbor++; //la célula de arriba está viva.

                //3
                if(x<(this.size-1)&& y>0) //No está en el borde superior derecho.
                if(this.cells[x+1][y-1]) //la célula de la derecha arriba está viva.
                   livingNeighbor++;

                //4   
                if(x>0)   //No está en el borde izquierdo.
                if(this.cells[x-1][y]) //la célula de la izquierda está viva.
                   livingNeighbor++;

                //5
                if(x<(this.size-1))   //No está en el borde derecho.
                if(this.cells[x+1][y]) //la célula de la derecha está viva.
                   livingNeighbor++;

                //6
                if(x>0 && (this.size-1))   //No está en el borde inferior izquierdo.
                if(this.cells[x-1][y+1]) //la célula de la izquierda abajo está viva.
                   livingNeighbor++;

                //7
                if(y<(this.size-1))   //No está en el borde inferior.
                if(this.cells[x][y+1]) //la célula de abajo está viva.
                   livingNeighbor++;

                //8
                if(x<(this.size-1) && y<(this.size-1))  //No está en el borde inferior derecho.
                if(this.cells[x+1][y+1]) //la célula de la derecha abajo está viva.
                   livingNeighbor++;


                //ANÁLISIS DEL CONJUNTO DE VECINOS.
                if(this.cells[x][y])
                   cellsAux[x][y] = livingNeighbor == 2 || livingNeighbor == 3 ? true : false;  //Si la célula está viva y tiene 2 o 3 vecinos vivos, la célula sigue viva.
                else
                   cellsAux[x][y] = llivingNeighbor == 3 ? true : false; //Si la célula está muerta y tiene 3 vecinos vivos, la célula revive.
            }
        }

        this.cells = this.cellsAux; //El universo del pasado ya se analizó y se reemplaza por el nuevo.
    }

}

const cells = new Array(100).fill("").map(()=>new Array(100).fill(false));

//PATRÓN DE INICIALIZACIÓN.
cells[0][4] = true;
cells[0][5] = true;
cells[1][4] = true;
cells[1][5] = true;
cells[10][4] = true;
cells[10][5] = true;
cells[10][6] = true;
cells[11][3] = true;
cells[11][7] = true;
cells[12][2] = true;
cells[12][8] = true;
cells[13][2] = true;
cells[13][8] = true;
cells[14][5] = true;
cells[15][3] = true;
cells[15][7] = true;
cells[16][4] = true;
cells[16][5] = true;
cells[16][6] = true;
cells[17][5] = true;
cells[20][2] = true;
cells[20][3] = true;
cells[20][4] = true;
cells[21][2] = true;
cells[21][3] = true;
cells[21][4] = true;
cells[22][4] = true;
cells[22][1] = true;
cells[22][5] = true;
cells[24][0] = true;
cells[24][1] = true;
cells[24][5] = true;
cells[24][6] = true;
cells[34][2] = true;
cells[34][3] = true;
cells[35][2] = true;
cells[35][3] = true;

const ctx = canvas.getContext('2d'); //universo bidimensional.
const cellularAutomata = new CellularAutomata(100,ctx,cells);
cellularAutomata.create(); //Crear matriz aleatoria de booleanos.

setInterval(() => cellularAutomata.next(),100); //imprimir y evaluar por segundo.

