import { App } from './app';
import './main.scss';

const hello = "yep, it's workin still sick";
document.body.innerHTML = hello;
const app = new App();
app.getThis('');
document.addEventListener('click', (ev)=>{app.getThis(ev)})