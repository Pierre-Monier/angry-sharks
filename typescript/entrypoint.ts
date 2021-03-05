import { Drawer } from './frame';
window.onload = () => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const gl = canvas.getContext("webgl2");

    const drawer = new Drawer({ canvas, gl });

    drawer.start();
}
