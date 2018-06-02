import App from './app';
import './index.css';

const app = new App(1680, 1003);

const rotateNotice = document.querySelector('.rotate-notice') as HTMLElement;

const toggleRotateNotice = () => {
  let debounce: number;

  return () => {
    clearInterval(debounce);
    debounce = setTimeout(() => {
      debounce = null;
      rotateNotice.style.display = (window.innerHeight > window.innerWidth) ? 'block' : 'none';  
    }, 500);
  };
};

window.addEventListener('resize', toggleRotateNotice());

toggleRotateNotice()();