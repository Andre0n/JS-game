const w=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}};w();const E=e=>{const n=document.createElement("canvas"),t=n.getContext("2d");return{element:n,context:t,setSize(s,o){this.element.width=s,this.element.height=o}}},r=(e=0,n=0)=>({x:e,y:n,add(t){return r(this.x+t.x,this.y+t.y)},angle(){return Math.atan2(this.y,this.x)},angleToPoint(t){return t.sub(this).angle()},dot(t){return this.x*t.x+this.y*t.y},length(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize(){let t=this.length();t!=0&&(this.x/=t,this.y/=t)},normalized(){return this.normalize(),this},scalar(t){return r(this.x*t,this.y*t)},sub(t){return r(this.x-t.x,this.y-t.y)}}),d=(e,n,t,s)=>({radius:e,speed:n,color:t,position:s,velocity:r(),render(o){o.beginPath(),o.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,0),o.fillStyle=this.color,o.shadowColor=this.color,o.fill(),o.closePath()}}),v=15,L=900,g=1.5,M="#FF0",P=(e,n)=>{const t=d(v,L,M,e);return t.lifeTime=g,t.direction=e.angleToPoint(n),t.velocity=r(Math.cos(t.direction),Math.sin(t.direction)),t.velocity=t.velocity.scalar(t.speed),t.update=s=>{t.lifeTime-=s,t.position=t.position.add(t.velocity.scalar(s))},t.draw=s=>t.render(s),t},c={position:r(innerWidth/2,innerHeight/2),isDown:!1},u={w:!1,a:!1,s:!1,d:!1},l=(()=>({isDown(e){return u[e]},setDown(e){u[e]=!0},setUp(e){u[e]=!1},setMousePositon(e,n){c.position=r(e,n)},getMousePosition(){return c.position},setMouseDown(){c.isDown=!0},setMouseUp(){c.isDown=!1},mouseIsDown(){return c.isDown}}))(),h=30,S=.25/2,D=r(innerWidth/2-h,innerHeight/2-h),I=300,A="#FF0",p={w:r(0,-1),s:r(0,1),d:r(1,0),a:r(-1,0)},T=e=>e.lifeTime>0,R=()=>{const e=d(h,I,A,D);return e.bullets=[],e.lastShot=null,e.move=n=>{for(let t in p)l.isDown(t)&&(e.velocity=e.velocity.add(p[t]));e.velocity=e.velocity.normalized().scalar(e.speed),e.position=e.position.add(e.velocity.scalar(n)),e.velocity=r()},e.shoot=()=>{let n=performance.now()*.001;if(e.lastShot===null&&(e.lastShoot=n),l.mouseIsDown()){let t=l.getMousePosition(),s=r(e.position.x,e.position.y);if(n-e.lastShot>S){let o=P(s,t);e.bullets.push(o),e.lastShot=n}}},e.updateBullets=n=>{e.bullets.forEach(t=>{t.update(n)}),e.bullets=e.bullets.filter(T)},e.renderBullets=n=>{e.bullets.forEach(t=>{t.render(n)})},e.update=n=>{e.move(n),e.shoot(),e.updateBullets(n)},e.draw=n=>{e.render(n),e.renderBullets(n)},e},_=30,b=300,N="#FF0",O=e=>{const n=d(_,b,N,e);return n.isAlive=!0,n.velocity=r(),n.update=(t,s)=>{let o=n.position.angleToPoint(s);n.velocity=r(Math.cos(o),Math.sin(o)),n.velocity=n.velocity.scalar(n.speed).scalar(t),n.position=n.position.add(n.velocity)},n.draw=t=>n.render(t),n},U=(()=>({randomInRange(e=0,n=1){return Math.random()*(n-e)+e}}))(),y=1,m=1500,Y=100,C=()=>{const e=R(),n=[];let t=y,s=y;return{player:e,spawnEnemy(){let o=U.randomInRange(0,2*Math.PI),i=r(m*Math.cos(o),m*Math.sin(o));n.push(O(i))},checkSpawnEnemy(o){t-=o,t<=0&&(this.spawnEnemy(),t=s,s/=Y)},update(o){this.checkSpawnEnemy(o),n.forEach(i=>{i.update(o,e.position)}),e.update(o)},draw(o){o.clearRect(0,0,window.innerWidth,window.innerHeight),n.forEach(i=>{i.draw(o)}),this.player.draw(o)}}},F=({key:e})=>l.setDown(e),x=({key:e})=>l.setUp(e),B=({clientX:e,clientY:n})=>{l.setMousePositon(e,n)},z=()=>l.setMouseDown(),W=()=>l.setMouseUp();(function(){const n=document.querySelector("#app"),t=E(),s=C();let o=null;t.setSize(innerWidth,innerHeight),n.appendChild(t.element);const i=a=>{o===null&&(o=a);const f=(a-o)*.001;o=a,s.update(f),s.draw(t.context),window.requestAnimationFrame(i)};window.requestAnimationFrame(i),window.addEventListener("resize",()=>{t.setSize(innerWidth,innerHeight)}),window.addEventListener("keydown",F),window.addEventListener("keyup",x),window.addEventListener("mousemove",B),window.addEventListener("mousedown",z),window.addEventListener("mouseup",W)})();