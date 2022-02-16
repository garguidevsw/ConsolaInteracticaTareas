const colors = require('colors');
const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach( (key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    cargarTareasFromArray( tareas = []) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log(); // Agrega una linea vacia
        this.listadoArr.forEach( (tarea, index) => {
            console.log(`${ colors.green(index+1) }. ${ tarea.desc } :: ${ tarea.completadoEn == null ? colors.red('Pendiente') : colors.green('Completado') }`);
        });
    }

    listarPendientesCompletadas( completadas = true ) {
        console.log(); // Agrega una linea vacia
        let result = [];

        if(!completadas){
            result = this.listadoArr.filter( tarea => tarea.completadoEn == null );
        }else{
            result = this.listadoArr.filter( tarea => tarea.completadoEn != null );
        }

        result.forEach( ({ desc, completadoEn:estado }, index) => {
            
            console.log(`${ colors.green(index+1) }. ${ desc } :: ${ estado == null ? colors.red('Pendiente') : colors.green(estado) }`);
        });
    }

    borrarTarea( id = '' ){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    completarTareas( ids = [] ){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;