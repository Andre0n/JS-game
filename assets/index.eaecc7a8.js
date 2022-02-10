const m=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};m();const w=e=>{const n=document.createElement("canvas"),t=n.getContext("2d");return{element:n,context:t,setSize(i,s){this.element.width=i,this.element.height=s}}},r=(e=0,n=0)=>({x:e,y:n,add(t){return r(this.x+t.x,this.y+t.y)},angle(){return Math.atan2(this.y,this.x)},angleToPoint(t){return t.sub(this).angle()},distanceTo(t){return Math.sqrt((this.x-t.x)*(this.x-t.x)+(this.y-t.y)*(this.y-t.y))},dot(t){return this.x*t.x+this.y*t.y},length(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize(){let t=this.length();t!=0&&(this.x/=t,this.y/=t)},normalized(){return this.normalize(),this},scalar(t){return r(this.x*t,this.y*t)},sub(t){return r(this.x-t.x,this.y-t.y)}}),d=(e,n,t,i,s)=>({radius:e,speed:n,color:t,blur:i,position:s,velocity:r(),render(o){o.beginPath(),o.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,0),o.fillStyle=this.color,o.shadowColor=this.color,o.shadowBlur=this.blur,o.fill(),o.closePath()}}),L=15,v=5,M=700,g=1.5,P="#ffdd59",S=(e,n)=>{const t=d(L,M,P,v,e);return t.lifeTime=g,t.direction=e.angleToPoint(n),t.velocity=r(Math.cos(t.direction),Math.sin(t.direction)),t.velocity=t.velocity.scalar(t.speed),t.update=i=>{t.lifeTime-=i,t.position=t.position.add(t.velocity.scalar(i))},t.draw=i=>t.render(i),t},c={position:r(innerWidth/2,innerHeight/2),isDown:!1},u={w:!1,a:!1,s:!1,d:!1},l=(()=>({isDown(e){return u[e]},setDown(e){u[e]=!0},setUp(e){u[e]=!1},setMousePositon(e,n){c.position=r(e,n)},getMousePosition(){return c.position},setMouseDown(){c.isDown=!0},setMouseUp(){c.isDown=!1},mouseIsDown(){return c.isDown}}))(),h=30,A=15,T=.25/2,D=r(innerWidth/2-h,innerHeight/2-h),I=300,R="#ffdd59",f={w:r(0,-1),s:r(0,1),d:r(1,0),a:r(-1,0)},_=e=>e.lifeTime>0,B=()=>{const e=d(h,I,R,A,D);return e.bullets=[],e.lastShot=null,e.move=n=>{for(let t in f)l.isDown(t)&&(e.velocity=e.velocity.add(f[t]));e.velocity=e.velocity.normalized().scalar(e.speed),e.position=e.position.add(e.velocity.scalar(n)),e.velocity=r()},e.shoot=()=>{let n=performance.now()*.001;if(e.lastShot===null&&(e.lastShoot=n),l.mouseIsDown()){let t=l.getMousePosition(),i=r(e.position.x,e.position.y);if(n-e.lastShot>T){let s=S(i,t);e.bullets.push(s),e.lastShot=n}}},e.updateBullets=n=>{e.bullets.forEach(t=>{t.update(n)}),e.bullets=e.bullets.filter(_)},e.renderBullets=n=>{e.bullets.forEach(t=>{t.render(n)})},e.update=n=>{e.move(n),e.shoot(),e.updateBullets(n)},e.draw=n=>{e.render(n),e.renderBullets(n)},e},U=30,b=15,N=150,Y="#ff4757",C=e=>{const n=d(U,N,Y,b,e);return n.isAlive=!0,n.velocity=r(),n.update=(t,i)=>{let s=n.position.angleToPoint(i);n.velocity=r(Math.cos(s),Math.sin(s)),n.velocity=n.velocity.scalar(n.speed).scalar(t),n.position=n.position.add(n.velocity)},n.draw=t=>n.render(t),n},O=(()=>({randomInRange(e=0,n=1){return Math.random()*(n-e)+e}}))(),p=1,y=1500,x=1.01,k=e=>e.isAlive,z=()=>{const e=B();let n=[],t=p,i=p;return{player:e,spawnEnemy(){let s=O.randomInRange(0,2*Math.PI),o=r(y*Math.cos(s),y*Math.sin(s));n.push(C(o))},checkSpawnEnemy(s){t-=s,t<=0&&(this.spawnEnemy(),t=i,i/=x)},checkBulletCollision(){n.forEach(s=>{s.isAlive&&e.bullets.forEach(o=>{s.position.distanceTo(o.position)<=o.radius+s.radius&&(o.lifeTime=0,s.isAlive=!1)})})},update(s){this.checkSpawnEnemy(s),this.checkBulletCollision(),n=n.filter(k),n.forEach(o=>{o.update(s,e.position)}),e.update(s)},draw(s){s.clearRect(0,0,window.innerWidth,window.innerHeight),n.forEach(o=>{o.draw(s)}),this.player.draw(s)}}},W=({key:e})=>l.setDown(e),q=({key:e})=>l.setUp(e),F=({clientX:e,clientY:n})=>{l.setMousePositon(e,n)},H=()=>l.setMouseDown(),K=()=>l.setMouseUp();(function(){const n=document.querySelector("#app"),t=w(),i=z();let s=null;t.setSize(innerWidth,innerHeight),n.appendChild(t.element);const o=a=>{s===null&&(s=a);const E=(a-s)*.001;s=a,i.update(E),i.draw(t.context),window.requestAnimationFrame(o)};window.requestAnimationFrame(o),window.addEventListener("resize",()=>{t.setSize(innerWidth,innerHeight)}),window.addEventListener("keydown",W),window.addEventListener("keyup",q),window.addEventListener("mousemove",F),window.addEventListener("mousedown",H),window.addEventListener("mouseup",K)})();
