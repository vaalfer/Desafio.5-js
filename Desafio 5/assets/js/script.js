// 
const fecha = document.querySelector("#fecha")
const lista = document.querySelector("#lista")
btnEnter = document.querySelector("#botonenter")
const okcounterHTML = document.querySelector("#realizadas")
const notcounterHTML = document.querySelector("#pendientes")

const check = `fa-check-circle`
const uncheck = `fa-circle`
const lineThrough = `line-through`
let id = 0
const LIST = [
    {   nombre: "Darle comida al perro",
        id: id,
        realizado: false,
        eliminado: false},
    {   nombre: "Hacer la cama",
        id: id,
        realizado: false,
        eliminado: false},
    {   nombre: "Comer gomitas",
        id: id,
        realizado: false,
        eliminado: false}
]
let okcounter = 0
let notcounter = 0

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
    //lista.innerHTML+=elemento
    notcounter++
    notcounterHTML.innerHTML=notcounter
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
        //console.log(element)
        //console.log(elementData)
        //console.log(element.classList)
        if(element.classList.contains(uncheck)){
            notcounter--
            okcounter++
        }
        else if(element.classList.contains(check)){
            notcounter++
            okcounter--
        }
        notcounterHTML.innerHTML=notcounter
        okcounterHTML.innerHTML=okcounter
        tareaRealizada(element)
    }
    else if (elementData==="eliminado"){
        tareaEliminada(element)
        if(notcounter>0){
            notcounter--
        }
        if(okcounter>0){
            okcounter--
        }
        notcounterHTML.innerHTML=notcounter
        okcounterHTML.innerHTML=okcounter
    }
})

function cargaInicial(id) {
    for(const tarea of LIST){
        console.log(tarea)
        agregarTarea(tarea.nombre,tarea.id,tarea.realizado,tarea.eliminado)
        console.log('ID antes era:' + id)
        id++
        console.log('ID despues es:' + id)
    }
    okcounterHTML.innerHTML = okcounter
    notcounterHTML.innerHTML = notcounter
}
cargaInicial()
