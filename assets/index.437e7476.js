const R=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}};R();const M=e=>{const i=document.createElement("canvas"),t=i.getContext("2d");return{element:i,context:t,setSize(o,s){this.element.width=o,this.element.height=s}}},l=(e=0,i=0)=>({x:e,y:i,add(t){return l(this.x+t.x,this.y+t.y)},angle(){return Math.atan2(this.y,this.x)},angleToPoint(t){return t.sub(this).angle()},distanceTo(t){return Math.sqrt((this.x-t.x)*(this.x-t.x)+(this.y-t.y)*(this.y-t.y))},dot(t){return this.x*t.x+this.y*t.y},length(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize(){let t=this.length();t!=0&&(this.x/=t,this.y/=t)},normalized(){return this.normalize(),this},scalar(t){return l(this.x*t,this.y*t)},sub(t){return l(this.x-t.x,this.y-t.y)}}),E=(e,i,t,o,s)=>({radius:e,speed:i,color:t,blur:o,position:s,velocity:l(),render(r){r.beginPath(),r.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,0),r.fillStyle=this.color,r.shadowColor=this.color,r.shadowBlur=this.blur,r.fill(),r.closePath()}}),D=15,_=5,O=700,C=1.5,B="#ffdd59",U=(e,i)=>{const t=E(D,O,B,_,e);return t.lifeTime=C,t.direction=e.angleToPoint(i),t.velocity=l(Math.cos(t.direction),Math.sin(t.direction)),t.velocity=t.velocity.scalar(t.speed),t.update=o=>{t.lifeTime-=o,t.position=t.position.add(t.velocity.scalar(o))},t.draw=o=>t.render(o),t},u={position:l(innerWidth/2,innerHeight/2),isDown:!1},P={w:!1,a:!1,s:!1,d:!1,Escape:!1,Enter:!1},d=(()=>({isDown(e){return P[e]},setDown(e){P[e]=!0},setUp(e){P[e]=!1},setMousePositon(e,i){u.position=l(e,i)},getMousePosition(){return u.position},setMouseDown(){u.isDown=!0},setMouseUp(){u.isDown=!1},mouseIsDown(){return u.isDown}}))(),v=30,Y=15,b=10,k=.25/2,H=l(innerWidth/2-v,innerHeight/2-v),N=300,x="#ffdd59",L={w:l(0,-1),s:l(0,1),d:l(1,0),a:l(-1,0)},W=e=>e.lifeTime>0,T=()=>{const e=E(v,N,x,Y,H);return e.bullets=[],e.lastShot=null,e.health=b,e.isAlive=!0,e.score=0,e.increaseScore=()=>{e.score++},e.damage=()=>{if(e.health<=0){e.isAlive=!1;return}e.health--},e.move=i=>{for(let t in L)d.isDown(t)&&(e.velocity=e.velocity.add(L[t]));e.velocity=e.velocity.normalized().scalar(e.speed),e.position=e.position.add(e.velocity.scalar(i)),e.velocity=l()},e.shoot=()=>{let i=performance.now()*.001;if(e.lastShot===null&&(e.lastShoot=i),d.mouseIsDown()){let t=d.getMousePosition(),o=l(e.position.x,e.position.y);if(i-e.lastShot>k){let s=U(o,t);e.bullets.push(s),e.lastShot=i}}},e.updateBullets=i=>{e.bullets.forEach(t=>{t.update(i)}),e.bullets=e.bullets.filter(W)},e.renderBullets=i=>{e.bullets.forEach(t=>{t.render(i)})},e.update=i=>{e.move(i),e.shoot(),e.updateBullets(i)},e.draw=i=>{e.render(i),e.renderBullets(i)},e},F=30,z=15,K=150,G="#ff4757",q=e=>{const i=E(F,K,G,z,e);return i.isAlive=!0,i.velocity=l(),i.update=(t,o)=>{let s=i.position.angleToPoint(o);i.velocity=l(Math.cos(s),Math.sin(s)),i.velocity=i.velocity.scalar(i.speed).scalar(t),i.position=i.position.add(i.velocity)},i.draw=t=>i.render(t),i},f=(e,i="#FFF",t=0,o)=>({value:e,color:i,blur:t,position:o,render(s){s.fillStyle=this.color,s.shadowColor=this.color,s.shadowBlur=this.blur,s.font="22px 'Press Start 2P'",s.fillText(this.value,this.position.x,this.position.y)}}),m=(()=>({randomInRange(e=0,i=1){return Math.random()*(i-e)+e}}))(),$=5,p=300,X=.8,j=120,J=(e,i)=>{const t=E($,p,i,0,e);t.alpha=j;const o=i;return t.lifeTime=X,t.velocity=l(m.randomInRange(-p,p),m.randomInRange(-p,p)),t.update=s=>{t.lifeTime-=s,t.position=t.position.add(t.velocity.scalar(s)),t.alpha=t.alpha>0?t.alpha-2:0},t.draw=s=>{t.color=`${o}${t.alpha}`,t.render(s)},t},Q=(()=>({draw(e,i,t){let o=f(`Health: ${i}`,"#ffdd59",0,l(30,80)),s=f(`Score: ${t}`,"#ffdd59",1,l(30,120));o.render(e),s.render(e)}}))(),w=1,g=1500,V=1.01,Z=.25/2,ee=e=>e.isAlive,te=e=>e.lifeTime>0,A=(e,i,t)=>{let o=m.randomInRange(20,100);for(let s=0;s<o;s++)e.push(J(i,t))},ie=()=>{let e=T(),i=[],t=w,o=w,s=!1,r=null,c=!1,h=[];return{player:e,spawnEnemy(){let n=m.randomInRange(0,2*Math.PI),a=l(g*Math.cos(n),g*Math.sin(n));i.push(q(a))},checkGameOver(){e.health<1&&(c=!0)},checkSpawnEnemy(n){t-=n,t<=0&&(this.spawnEnemy(),t=o,o/=V)},checkBulletCollision(){i.forEach(n=>{n.isAlive&&e.bullets.forEach(a=>{n.position.distanceTo(a.position)<=a.radius+n.radius&&(a.lifeTime=0,A(h,n.position,n.color),n.isAlive=!1,e.increaseScore())})})},checkPlayerCollision(){i.forEach(n=>{n.isAlive&&n.position.distanceTo(e.position)<=e.radius+n.radius&&(e.damage(),A(h,n.position,n.color),n.isAlive=!1)})},checkKeyPressed(){let n=performance.now()*.001;r===null&&(r=n),!(n-r<Z)&&(d.isDown("Escape")&&!c?s=!s:d.isDown("Enter")&&c&&this.restart(),r=n)},restart(){e=T(),i.length=0,h.length=0,t=w,o=w,s=!1,c=!1},update(n){this.checkKeyPressed(),!(s||c)&&(this.checkGameOver(),this.checkSpawnEnemy(n),this.checkBulletCollision(),this.checkPlayerCollision(),i=i.filter(ee),i.forEach(a=>{a.update(n,e.position)}),h=h.filter(te),h.forEach(a=>a.update(n)),e.update(n))},drawGameOver(n){let a=l(innerWidth/2-400,innerHeight/2),y=f("Game Over (Press enter to continue)","#000",0,a),S=l(innerWidth/2-400,innerHeight/2+50),I=f(`You Scored: ${e.score}`,"#000",0,S);n.fillRect(0,0,innerWidth,innerHeight),y.render(n),I.render(n)},drawPaused(n){let a=l(innerWidth/2-400,innerHeight/2),y=f("Game Paused (Press esc to continue)","#000",0,a);n.fillRect(0,0,innerWidth,innerHeight),y.render(n)},draw(n){if(n.clearRect(0,0,window.innerWidth,window.innerHeight),i.forEach(a=>{a.draw(n)}),h.forEach(a=>{a.draw(n)}),e.draw(n),Q.draw(n,e.health,e.score),s){this.drawPaused(n);return}if(c){this.drawGameOver(n);return}}}},se=({key:e})=>d.setDown(e),ne=({key:e})=>d.setUp(e),oe=({clientX:e,clientY:i})=>{d.setMousePositon(e,i)},re=()=>d.setMouseDown(),le=()=>d.setMouseUp();(function(){const i=document.querySelector("#app"),t=M(),o=ie();let s=null;t.setSize(innerWidth,innerHeight),i.appendChild(t.element);const r=c=>{s===null&&(s=c);const h=(c-s)*.001;s=c,o.update(h),o.draw(t.context),window.requestAnimationFrame(r)};window.requestAnimationFrame(r),window.addEventListener("resize",()=>{t.setSize(innerWidth,innerHeight)}),window.addEventListener("keydown",se),window.addEventListener("keyup",ne),window.addEventListener("mousemove",oe),window.addEventListener("mousedown",re),window.addEventListener("mouseup",le)})();