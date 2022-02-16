const inquirer = require('inquirer');
const colors = require('colors');

const answers = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('================================='.green);
    console.log('     Seleccione una opción       '.white);
    console.log('=================================\n'.green);

    const { opcion } = await inquirer.prompt(answers);

    return opcion;

}

const pausa = async() => {
    console.log('\n');
    await inquirer.prompt([
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.blue } para continuar`,
        }
    ]);

}

const confirmar = async(message) => {
    console.log('\n');
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;

}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

const listadoTareasBorrar = async( tareas=[] ) => {
    const choices = tareas.map( (tarea, index) => {
        return {
            value: tarea.id,
            name: `${colors.green(index+1)}. ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar tarea',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);

    return id;
   
}

const mostrarListadoChecklist = async( tareas=[] ) => {
    const choices = tareas.map( (tarea, index) => {
        return {
            value: tarea.id,
            name: `${colors.green(index+1)}. ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccionar tareas',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);

    return ids;
   
}

module.exports = {
    inquirerMenu,
    pausa,
    confirmar,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoChecklist
}