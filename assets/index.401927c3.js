const m=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}};m();const v=e=>{const s=document.createElement("canvas"),t=s.getContext("2d");return{element:s,context:t,setSize(n,i){this.element.width=n,this.element.height=i}}},r=(e=0,s=0)=>({x:e,y:s,add(t){return r(this.x+t.x,this.y+t.y)},angle(){return Math.atan2(this.y,this.x)},angleToPoint(t){return t.sub(this).angle()},distanceTo(t){return Math.sqrt((this.x-t.x)*(this.x-t.x)+(this.y-t.y)*(this.y-t.y))},dot(t){return this.x*t.x+this.y*t.y},length(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize(){let t=this.length();t!=0&&(this.x/=t,this.y/=t)},normalized(){return this.normalize(),this},scalar(t){return r(this.x*t,this.y*t)},sub(t){return r(this.x-t.x,this.y-t.y)}}),d=(e,s,t,n,i)=>({radius:e,speed:s,color:t,blur:n,position:i,velocity:r(),render(o){o.beginPath(),o.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,0),o.fillStyle=this.color,o.shadowColor=this.color,o.shadowBlur=this.blur,o.fill(),o.closePath()}}),L=15,P=5,A=700,M=1.5,S="#ffdd59",g=(e,s)=>{const t=d(L,A,S,P,e);return t.lifeTime=M,t.direction=e.angleToPoint(s),t.velocity=r(Math.cos(t.direction),Math.sin(t.direction)),t.velocity=t.velocity.scalar(t.speed),t.update=n=>{t.lifeTime-=n,t.position=t.position.add(t.velocity.scalar(n))},t.draw=n=>t.render(n),t},c={position:r(innerWidth/2,innerHeight/2),isDown:!1},u={w:!1,a:!1,s:!1,d:!1},l=(()=>({isDown(e){return u[e]},setDown(e){u[e]=!0},setUp(e){u[e]=!1},setMousePositon(e,s){c.position=r(e,s)},getMousePosition(){return c.position},setMouseDown(){c.isDown=!0},setMouseUp(){c.isDown=!1},mouseIsDown(){return c.isDown}}))(),h=30,T=15,I=10,R=.25/2,D=r(innerWidth/2-h,innerHeight/2-h),_=300,b="#ffdd59",f={w:r(0,-1),s:r(0,1),d:r(1,0),a:r(-1,0)},B=e=>e.lifeTime>0,C=()=>{const e=d(h,_,b,T,D);return e.bullets=[],e.lastShot=null,e.health=I,e.isAlive=!0,e.score=0,e.increaseScore=()=>{e.score++},e.damage=()=>{if(e.health<=0){e.isAlive=!1;return}e.health--},e.move=s=>{for(let t in f)l.isDown(t)&&(e.velocity=e.velocity.add(f[t]));e.velocity=e.velocity.normalized().scalar(e.speed),e.position=e.position.add(e.velocity.scalar(s)),e.velocity=r()},e.shoot=()=>{let s=performance.now()*.001;if(e.lastShot===null&&(e.lastShoot=s),l.mouseIsDown()){let t=l.getMousePosition(),n=r(e.position.x,e.position.y);if(s-e.lastShot>R){let i=g(n,t);e.bullets.push(i),e.lastShot=s}}},e.updateBullets=s=>{e.bullets.forEach(t=>{t.update(s)}),e.bullets=e.bullets.filter(B)},e.renderBullets=s=>{e.bullets.forEach(t=>{t.render(s)})},e.update=s=>{e.move(s),e.shoot(),e.updateBullets(s)},e.draw=s=>{e.render(s),e.renderBullets(s)},e},U=30,N=15,Y=150,O="#ff4757",x=e=>{const s=d(U,Y,O,N,e);return s.isAlive=!0,s.velocity=r(),s.update=(t,n)=>{let i=s.position.angleToPoint(n);s.velocity=r(Math.cos(i),Math.sin(i)),s.velocity=s.velocity.scalar(s.speed).scalar(t),s.position=s.position.add(s.velocity)},s.draw=t=>s.render(t),s},p=(e,s="#FFF",t=0,n)=>({value:e,color:s,blur:t,position:n,render(i){i.fillStyle=this.color,i.shadowColor=this.color,i.shadowBlur=this.blur,i.font="22px 'Press Start 2P'",i.fillText(this.value,this.position.x,this.position.y)}}),k=(()=>({draw(e,s,t){let n=p(`Health: ${s}`,"#ffdd59",0,r(30,80)),i=p(`Score: ${t}`,"#ffdd59",1,r(30,120));n.render(e),i.render(e)}}))(),H=(()=>({randomInRange(e=0,s=1){return Math.random()*(s-e)+e}}))(),y=1,E=1500,F=1.01,z=e=>e.isAlive,W=()=>{const e=C();let s=[],t=y,n=y;return{player:e,spawnEnemy(){let i=H.randomInRange(0,2*Math.PI),o=r(E*Math.cos(i),E*Math.sin(i));s.push(x(o))},checkSpawnEnemy(i){t-=i,t<=0&&(this.spawnEnemy(),t=n,n/=F)},checkBulletCollision(){s.forEach(i=>{i.isAlive&&e.bullets.forEach(o=>{i.position.distanceTo(o.position)<=o.radius+i.radius&&(o.lifeTime=0,i.isAlive=!1,e.increaseScore())})})},checkPlayerCollision(){s.forEach(i=>{i.isAlive&&i.position.distanceTo(e.position)<=e.radius+i.radius&&(e.damage(),i.isAlive=!1)})},update(i){this.checkSpawnEnemy(i),this.checkBulletCollision(),this.checkPlayerCollision(),s=s.filter(z),s.forEach(o=>{o.update(i,e.position)}),e.update(i)},draw(i){i.clearRect(0,0,window.innerWidth,window.innerHeight),s.forEach(o=>{o.draw(i)}),e.draw(i),k.draw(i,e.health,e.score)}}},q=({key:e})=>l.setDown(e),K=({key:e})=>l.setUp(e),$=({clientX:e,clientY:s})=>{l.setMousePositon(e,s)},G=()=>l.setMouseDown(),X=()=>l.setMouseUp();(function(){const s=document.querySelector("#app"),t=v(),n=W();let i=null;t.setSize(innerWidth,innerHeight),s.appendChild(t.element);const o=a=>{i===null&&(i=a);const w=(a-i)*.001;i=a,n.update(w),n.draw(t.context),window.requestAnimationFrame(o)};window.requestAnimationFrame(o),window.addEventListener("resize",()=>{t.setSize(innerWidth,innerHeight)}),window.addEventListener("keydown",q),window.addEventListener("keyup",K),window.addEventListener("mousemove",$),window.addEventListener("mousedown",G),window.addEventListener("mouseup",X)})();
