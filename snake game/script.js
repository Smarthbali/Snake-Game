document.addEventListener('DOMContentLoaded' ,function (){
    const gamearena=document.getElementById('game-arena');
    const areanasize=600;
    const cellsize=20;
    let score=0;
    let gamestarted=false;
    let food={x:300,y:200};
    let snake=[{x:160,y:200},{x:140,y:200},{x:120,y:200}];
    let dx=cellsize;
    let dy=0;
    let intervalid;
    let gamespeed=200;


    function movefood(){
        let newx,newy;
        do{
            newx=Math.floor(Math.random()*30)*cellsize;
            newy=Math.floor(Math.random()*30)*cellsize;
        } while(snake.some(snakecell=>snakecell.x===newx && snakecell.y===newy));
        food={x:newx,y:newy};
    }

    function updatesnake(){
        const newhead={x:snake[0].x+dx,y:snake[0].y+dy};
        snake.unshift(newhead);
        if(newhead.x==food.x && newhead.y==food.y){
            score+=10;
            movefood();
            if(gamespeed>50){
                clearInterval(intervalid);
                gamespeed-=10;
                gameloop();
            }
        }
        else{
            snake.pop();
        }
    }


    function changedirection(e){
        console.log("key pressed",e);
        const isgoingdown=dy ===cellsize;
        const isgoingup=dy===-cellsize;
        const isgoingright=dx===cellsize;
        const isgoingleft=dx===-cellsize;
        if(e.key==='ArrowUp'&&  !isgoingdown){
            dx=0;
            dy=-cellsize;
        }
        else if(e.key==='ArrowDown' &&  !isgoingup ){
            dx=0;
            dy=cellsize;

        }
        else if(e.key==='ArrowLeft' &&  !isgoingright){
            dx=-cellsize;
            dy=0;
        }
        else if(e.key==='ArrowRight' && !isgoingleft){
            dx=cellsize;
            dy=0;
            
        }
    }

    function drawdiv(x,y,classname){
        const divelement=document.createElement('div');
        divelement.classList.add(classname);
        divelement.style.top=`${y}px`;
        divelement.style.left=`${x}px`;
        return divelement; 

    }

    function drawfoodandsnake(){
        gamearena.innerHTML='';
        snake.forEach((snakecell)=>{
            const snakeelement=drawdiv(snakecell.x,snakecell.y,'snake');
            gamearena.appendChild(snakeelement);
        })


        const foodelement=drawdiv(food.x,food.y,'food');
        gamearena.appendChild(foodelement);
    }


    function isgameover(){
        for(let i=1;i<snake.length;i++){
            if(snake[0].x==snake[i].x && snake[0].y==snake[i].y ){
                return true;
            }
        }



        const hitwallleft= snake[0].x<0;
        const hitwallright=snake[0].x>areanasize-cellsize;
        const hittopwall=snake[0].y<0;
        const hitwallbottom=snake[0].y>areanasize-cellsize;
        return hitwallleft || hitwallright||hittopwall||hitwallbottom;
    }


    function gameloop(){
       
       intervalid= setInterval(()=>{
         if(isgameover()){
            clearInterval(intervalid);
            gamestarted=false;
            alert("Game over"+'\n'+'Your Score:'+score);
            return;
        }
            updatesnake();
            drawfoodandsnake();
            drawscoreboard();
        },gamespeed)

    }

    function rungame(){
        if(!gamestarted){
            gamestarted=true;
            document.addEventListener('keydown',changedirection);
            gameloop();
        }
    }



    function drawscoreboard(){
        const scoreboard=document.getElementById('score-board');
        scoreboard.textContent=`Score:${score}`;
    }

function initiategame(){
    const scoreboard=document.createElement('div');
    scoreboard.id='score-board';
    document.body.insertBefore(scoreboard, gamearena);
    const startbutton=document.createElement('button');
    startbutton.textContent="Start Game";
    startbutton.classList.add('start-button');
    startbutton.addEventListener('click', function startgame(){
        startbutton.style.display='none';
        rungame();

    })
    document.body.appendChild(startbutton);


}
initiategame();
})