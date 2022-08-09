// 
const tareasInicial = [

]


const fecha = document.querySelector("#fecha")
const lista = document.querySelector("#lista")
btnEnter = document.querySelector("#botonenter")
const check = `fa-check-circle`
const uncheck = `fa-circle`
const lineThrough = `line-through`
const id = 0
const LIST = []
html = ""


//fecha
const Fecha = new Date()
fecha.innerHTML = Fecha.toLocaleDateString('es-CH',{ weekday:'long', month: 'short', day:'numeric'})


//función para darle funcionalidad al botón
function agregarTarea (tarea, id, realizado, eliminado) {

    if(eliminado) {
        return
    }

    const Realizado = realizado ?check :uncheck
    const Line = realizado ?lineThrough :''
    let elemento = 
        `
        <li id="elemento">
        <i class="far ${Realizado}" data="realizado" id="${id}"></i>
        <p class="text ${Line}">${tarea}</p>
        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
        </li>
        `
    lista.insertAdjacentHTML("beforeend", elemento)
}

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado =  LIST[element.id].realizado ?false :true
}

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}


btnEnter.addEventListener("click", () => {

    const tarea = input.value
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }
    input.value = ""
    id++
})

document.addEventListener("keyup",function(event){
    
    if(event.key=="Enter") {
        const tarea = input.value
        if(tarea)
        {agregarTarea(tarea, id, false, false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
        }
        input.value = ""
        id++
    }
}) 

lista.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData==='realizado') {
        tareaRealizada(element)
    }
    else if (elementData==="eliminado"){
        tareaEliminada(element)
    }
})
