const $refs = {}
//const $subrefs = {}

function create(tag, object, ...children) {
let element = document.createElement(tag)
if (object.id) element.id = object.id
if (object.className) element.className = object.className
if (object.attrs) Object.keys(object.attrs).forEach(attr => element.setAttribute(attr, object.attrs[attr]))
if (object.props) Object.keys(object.props).forEach(prop => element[prop] = object.props[prop])
if (object.style) Object.keys(object.style).forEach(style_el => { element.style[style_el] = object.style[style_el] })
if (object.data) Object.keys(object.data).forEach(data_el => { element.dataset[data_el] = object.data[data_el] })
if (children.length) element.append(...children)
if (object.ref) $refs[object.ref] = element
return element
}
let defaultTheme = 'light'
let root = document.body
let nav = create('nav', { className: `navbar navbar-expand navbar-${defaultTheme} bg-${defaultTheme}`, data: { theme: defaultTheme } })
let brand = create('a', { className: 'navbar-brand', attrs: { href: '#' } }, 'TaskBuilder')

let ul = create(
'ul',
{ className: 'navbar-nav' },
create(
'li',
{ className: 'nav-item active' },
create('a', { className: 'nav-link', attrs: { href: '/' } }, 'Home')
),
create('li',
{ className: 'nav-item ' },
create('a', { ref: 'getData', className: 'nav-link', attrs: { href: '#' } , data: {view: false}}, 'getData'))
)

root.append(nav)
nav.append(brand)
brand.after(ul)

root.append(
create(
'div',
{ className: 'input-group p-3' },
create(
'input',
{
ref: 'input',
className: 'form-control', attrs: { placeholder: "Создай свою задачу" },
id: 'Main'

}
),
create(
'div',
{ className: 'input-group-append' },
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

function createTask(title, input=true, completed=false) {
if (title.trim()) {
root.append(
create('div', { className: 'input-group px-3 py-1' },
create('div', { className: 'input-group-prepend' },
create('div', { className: 'input-group-text' },
create( 'input', { ref: 'checkbox', attrs: {type:"checkbox" }, props:{checked: completed }})
)
),
create('input',{className: 'form-control', attrs: { type: 'text' , value: title}})
)
)
if (input) $refs.input.value = ''
}
}
function keypress(event) {
if (event.code === "Enter") {
createTask($refs.input.value)
}
}
$refs.input.addEventListener('keypress', keypress)

function click(event) {
createTask($refs.input.value)
}
$refs.button.addEventListener('click', click)

$refs.getData.onclick = function(){
var x = fetch('https://jsonplaceholder.typicode.com/todos/')
y = x.then(response => response.json())
y.then(data => {
data.forEach(task => createTask(task.title, false, task.completed))
})
}