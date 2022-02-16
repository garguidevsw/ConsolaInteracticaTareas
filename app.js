require('colors');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');

const Tareas = require('./models/tareas');

const main = async() => {  

    let opt = '';
    const tareas = new Tareas();
    
    const tareasDB = readDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{

        //Imprimir el menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
        
            case '2':
                tareas.listadoCompleto();
                break;
            
            case '3':
                tareas.listarPendientesCompletadas();
                break;

            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.completarTareas(ids);
                break;
            
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const resp = await confirmar('Desea borrar la tarea?');
                    if(resp){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada éxitosamente...'.yellow);
                    }
                }
                break;
        }

        saveDB(tareas.listadoArr);

        // const tarea = new Tarea('Nueva tarea');

        // tareas._listado[tarea.id] = tarea; 
        // console.log(tareas);
        await pausa();

    }while( opt !== '0')
}

main();