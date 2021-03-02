const $refs = {}


function create (tag, object, ...children){
let element = document.createElement(tag)
if (object.id) element.id = object.id
if (object.className) element.className = object.className
if (object.props) Object.keys(object.props).forEach(prop => element.setAttribute(prop, object.props[prop]))
if (object.style) Object.keys(object.style).forEach(style_el => {element.style[style_el] = object.style[style_el]})
if (object.data) Object.keys(object.data).forEach(data_el => {element.dataset[data_el] = object.data[data_el]})
if (children.length) element.append(...children)
if (object.ref) $refs[object.ref] = element
return element
}

let defaultTheme = 'light'

let root = document.body
let nav = create('nav', {className: `navbar navbar-expand navbar-${defaultTheme} bg-${defaultTheme}`, data: {theme: defaultTheme}})
let brand = create('a', {className:'navbar-brand', props: {href: '#'}}, 'TaskBuilder')

let ul = create(
'ul' ,
{className:'navbar-nav'},
create(
'li',
{className:'nav-item active'},
create('a', {className:'nav-link', props: {href: '/'}} ,'Home')
),
create('li',
{className:'nav-item '},
create('a', { ref: 'changeTheme', className:'nav-link', props: {href: '#'}} ,'Сменить тему')
)
)

root.append(nav)
nav.append(brand)
brand.after(ul)

root.append(create('p', {className:'px-3'}, 'Создавай свои задачи быстро и удобно'))




root.append(
create(
'div',
{className: 'input-group p-3'},
create(
'input',
{
ref: 'input',
className: 'form-control',props: {placeholder: "Создай свою задачу"}}
),
create(
'div',
{className: 'input-group-append'},
create(
'button',
{
ref: 'button',
className: 'btn btn-outline-secondary'
},
'+Создать'
)
))
)
function createTask () {
if ($refs.input.value.trim()){
root.append(create('p', {style: {border: '1px solid gray'}}, $refs.input.value))
}
$refs.input.value = ''
}

function click(event){
createTask()
}
$refs.button.addEventListener('click', click)
function keypress (event) {
if(event.code === "Enter") {
createTask(this)
}
}
$refs.input.addEventListener('keypress', keypress)

$refs.changeTheme.addEventListener('click', function (event){
console.log(event)
if (nav.dataset.theme === 'light'){
nav.classList.remove('navbar-light', 'bg-light')
nav.classList.add( 'bg-dark', 'navbar-dark')
nav.dataset.theme = 'dark'
} else {
nav.classList.add('navbar-light', 'bg-light')
nav.classList.remove( 'bg-dark', 'navbar-dark')
nav.dataset.theme = 'light'
}

})

