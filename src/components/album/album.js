  const canvaRef = useRef(null);

  //canvaRef = document.querySelector('#myCanva');
  const draw = (ctx, frameCount, x, y, radius) => {
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'purple';
    ctx.beginPath();
    ctx.arc(x, y, radius,0,2*Math.PI);
    ctx.fill();
  }


  useEffect(() => {
    const canvas = canvaRef.current;
    const ctx = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId;
    let radius = 20;
    let x = 20;
    let y = 20;



    const render = () => {
      frameCount ++;
    for(let i=0; i<20; i++) {
      x = Math.floor(Math.random()* 20);
      y = Math.floor(Math.random()*20);
      radius = Math.floor(Math.random()*20);
      
    }
      draw(ctx, frameCount, x, y, radius);
      //animationFrameId = window.requestAnimationFrame(render);
    }
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw])

