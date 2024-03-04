const pictures = document.querySelectorAll(".Picture");
let previousTouch = undefined;

function updateElementPosition (element, event){
    let moveX, moveY;
    if (event.type === 'touchmove') {
        const tounch = event.touches[0];
        moveX = previousTouch ? tounch.clientX - previousTouch:0;
        moveY = previousTouch ? tounch.clientY - previousTouch:0;
        previousTouch  = tounch;
    }else{
        moveX = event.movementX;
        moveY = event.movementY; 
    }
    const elementY = parseInt(element.style.top || 0) + moveY;
    const elementX = parseInt(element.style.left ||0) + moveX;

    element.style.top = elementY + "px";
    element.style.left = elementX + "px";
}
function startDrag( element, e){
    const update = (event) => updateElementPosition(element, event);
    const stop= () => stopDrag({update: update, stop:stop});
    document.addEventListener("mousemove", update);
    document.addEventListener("touchmove", update);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchend", stop); 
}
function stopDrag(functions){
    previousTouch = undefined;
    document.removeEventListener("mousemove", functions.update);
    document.removeEventListener("touchmove", functions.update);
    document.removeEventListener("mouseup", functions.stop);
    document.removeEventListener("touchend", functions.stop);
}
pictures.forEach(picture => {
    const range = 100;
    const randomX = Math.random() * (range * 2) - range;
    const randomY = Math.random() * ( range * 2) - range;
    const randomRotate = Math.random() * ( range / 2 ) - range/4;
    const start = (event) => startDrag(picture, event);
    picture.style.top = `${randomY}px`;
    picture.style.left = `${randomX}px`;
    picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
    picture.addEventListener("mousedown", start);
    picture.addEventListener("touchstart", start);
});



