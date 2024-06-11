import{BufferAttribute as t,BufferGeometry as e,Vector3 as s,Plane as r,Triangle as n,Object3D as o,Mesh as i,SphereGeometry as h,MeshBasicMaterial as c,BoxGeometry as a,LineBasicMaterial as u,Line as l}from"three";class d{static roundNumber(t,e){const s=Math.pow(10,e);return Math.round(t*s)/s}static sample(t){return t[Math.floor(Math.random()*t.length)]}static distanceToSquared(t,e){var s=t.x-e.x,r=t.y-e.y,n=t.z-e.z;return s*s+r*r+n*n}static isPointInPoly(t,e){for(var s=!1,r=-1,n=t.length,o=n-1;++r<n;o=r)(t[r].z<=e.z&&e.z<t[o].z||t[o].z<=e.z&&e.z<t[r].z)&&e.x<(t[o].x-t[r].x)*(e.z-t[r].z)/(t[o].z-t[r].z)+t[r].x&&(s=!s);return s}static isVectorInPolygon(t,e,s){var r=1e5,n=-1e5,o=[];return e.vertexIds.forEach(t=>{r=Math.min(s[t].y,r),n=Math.max(s[t].y,n),o.push(s[t])}),!!(t.y<n+.5&&t.y>r-.5&&this.isPointInPoly(o,t))}static triarea2(t,e,s){return(s.x-t.x)*(e.z-t.z)-(e.x-t.x)*(s.z-t.z)}static vequal(t,e){return this.distanceToSquared(t,e)<1e-5}static mergeVertices(s,r=1e-4){r=Math.max(r,Number.EPSILON);for(var n={},o=s.getIndex(),i=s.getAttribute("position"),h=o?o.count:i.count,c=0,a=[],u=[],l=Math.log10(1/r),d=Math.pow(10,l),p=0;p<h;p++){var g=o?o.getX(p):p,f="";f+=~~(i.getX(g)*d)+",",f+=~~(i.getY(g)*d)+",",(f+=~~(i.getZ(g)*d)+",")in n?a.push(n[f]):(u.push(i.getX(g)),u.push(i.getY(g)),u.push(i.getZ(g)),n[f]=c,a.push(c),c++)}const v=new t(new Float32Array(u),i.itemSize,i.normalized),b=new e;return b.setAttribute("position",v),b.setIndex(a),b}}class p{constructor(t){this.content=[],this.scoreFunction=t}push(t){this.content.push(t),this.sinkDown(this.content.length-1)}pop(){const t=this.content[0],e=this.content.pop();return this.content.length>0&&(this.content[0]=e,this.bubbleUp(0)),t}remove(t){const e=this.content.indexOf(t),s=this.content.pop();e!==this.content.length-1&&(this.content[e]=s,this.scoreFunction(s)<this.scoreFunction(t)?this.sinkDown(e):this.bubbleUp(e))}size(){return this.content.length}rescoreElement(t){this.sinkDown(this.content.indexOf(t))}sinkDown(t){const e=this.content[t];for(;t>0;){const s=(t+1>>1)-1,r=this.content[s];if(!(this.scoreFunction(e)<this.scoreFunction(r)))break;this.content[s]=e,this.content[t]=r,t=s}}bubbleUp(t){const e=this.content.length,s=this.content[t],r=this.scoreFunction(s);for(;;){const n=t+1<<1,o=n-1;let i,h=null;if(o<e&&(i=this.scoreFunction(this.content[o]),i<r&&(h=o)),n<e&&this.scoreFunction(this.content[n])<(null===h?r:i)&&(h=n),null===h)break;this.content[t]=this.content[h],this.content[h]=s,t=h}}}class g{static init(t){for(let e=0;e<t.length;e++){const s=t[e];s.f=0,s.g=0,s.h=0,s.cost=1,s.visited=!1,s.closed=!1,s.parent=null}}static cleanUp(t){for(let e=0;e<t.length;e++){const s=t[e];delete s.f,delete s.g,delete s.h,delete s.cost,delete s.visited,delete s.closed,delete s.parent}}static heap(){return new p(function(t){return t.f})}static search(t,e,s){this.init(t);const r=this.heap();for(r.push(e);r.size()>0;){const e=r.pop();if(e===s){let t=e;const s=[];for(;t.parent;)s.push(t),t=t.parent;return this.cleanUp(s),s.reverse()}e.closed=!0;const n=this.neighbours(t,e);for(let t=0,o=n.length;t<o;t++){const o=n[t];if(o.closed)continue;const i=e.g+o.cost,h=o.visited;if(!h||i<o.g){if(o.visited=!0,o.parent=e,!o.centroid||!s.centroid)throw new Error("Unexpected state");o.h=o.h||this.heuristic(o.centroid,s.centroid),o.g=i,o.f=o.g+o.h,h?r.rescoreElement(o):r.push(o)}}}return[]}static heuristic(t,e){return d.distanceToSquared(t,e)}static neighbours(t,e){const s=[];for(let r=0;r<e.neighbours.length;r++)s.push(t[e.neighbours[r]]);return s}}class f{static buildZone(t,e){const r=this._buildNavigationMesh(t,e),n={};r.vertices.forEach(t=>{t.x=d.roundNumber(t.x,2),t.y=d.roundNumber(t.y,2),t.z=d.roundNumber(t.z,2)}),n.vertices=r.vertices;const o=this._buildPolygonGroups(r);return n.groups=new Array(o.length),o.forEach((t,e)=>{const r=new Map;t.forEach((t,e)=>{r.set(t,e)});const o=new Array(t.length);t.forEach((t,e)=>{const i=[];t.neighbours.forEach(t=>i.push(r.get(t)));const h=[];t.neighbours.forEach(e=>h.push(this._getSharedVerticesInOrder(t,e)));const c=new s(0,0,0);c.add(n.vertices[t.vertexIds[0]]),c.add(n.vertices[t.vertexIds[1]]),c.add(n.vertices[t.vertexIds[2]]),c.divideScalar(3),c.x=d.roundNumber(c.x,2),c.y=d.roundNumber(c.y,2),c.z=d.roundNumber(c.z,2),o[e]={id:e,neighbours:i,vertexIds:t.vertexIds,centroid:c,portals:h}}),n.groups[e]=o}),n}static _buildNavigationMesh(t,e){return t=d.mergeVertices(t,e),this._buildPolygonsFromGeometry(t)}static _spreadGroupId(t){let e=new Set([t]);for(;e.size>0;){const s=e;e=new Set,s.forEach(s=>{s.group=t.group,s.neighbours.forEach(t=>{void 0===t.group&&e.add(t)})})}}static _buildPolygonGroups(t){const e=[];return t.polygons.forEach(t=>{void 0!==t.group?e[t.group].push(t):(t.group=e.length,this._spreadGroupId(t),e.push([t]))}),e}static _buildPolygonNeighbours(t,e){const s=new Set,r=e[t.vertexIds[1]],n=e[t.vertexIds[2]];return e[t.vertexIds[0]].forEach(e=>{e!==t&&(r.includes(e)||n.includes(e))&&s.add(e)}),r.forEach(e=>{e!==t&&n.includes(e)&&s.add(e)}),s}static _buildPolygonsFromGeometry(t){const e=[],r=[],n=t.attributes.position,o=t.index,i=[];for(let t=0;t<n.count;t++)r.push((new s).fromBufferAttribute(n,t)),i[t]=[];for(let s=0;s<t.index.count;s+=3){const t=o.getX(s),r=o.getX(s+1),n=o.getX(s+2),h={vertexIds:[t,r,n],neighbours:null};e.push(h),i[t].push(h),i[r].push(h),i[n].push(h)}return e.forEach(t=>{t.neighbours=this._buildPolygonNeighbours(t,i)}),{polygons:e,vertices:r}}static _getSharedVerticesInOrder(t,e){const s=t.vertexIds,r=s[0],n=s[1],o=s[2],i=e.vertexIds,h=i.includes(r),c=i.includes(n),a=i.includes(o);return h&&c&&a?Array.from(s):h&&c?[r,n]:c&&a?[n,o]:h&&a?[o,r]:(console.warn("Error processing navigation mesh neighbors; neighbors with <2 shared vertices found."),[])}}class v{constructor(){this.portals=[]}push(t,e){void 0===e&&(e=t),this.portals.push({left:t,right:e})}stringPull(){const t=this.portals,e=[];let s,r,n,o=0,i=0,h=0;s=t[0].left,r=t[0].left,n=t[0].right,e.push(s);for(let c=1;c<t.length;c++){const a=t[c].left,u=t[c].right;if(d.triarea2(s,n,u)<=0){if(!(d.vequal(s,n)||d.triarea2(s,r,u)>0)){e.push(r),s=r,o=i,r=s,n=s,i=o,h=o,c=o;continue}n=u,h=c}if(d.triarea2(s,r,a)>=0){if(!(d.vequal(s,r)||d.triarea2(s,n,a)<0)){e.push(n),s=n,o=h,r=s,n=s,i=o,h=o,c=o;continue}r=a,i=c}}return 0!==e.length&&d.vequal(e[e.length-1],t[t.length-1].left)||e.push(t[t.length-1].left),this.path=e,e}}class b{constructor(){this.zones={}}static createZone(t,e=1e-4){return f.buildZone(t,e)}setZoneData(t,e){this.zones[t]=e}getRandomNode(t,e,r,n){if(!this.zones[t])return new s;r=r||null,n=n||0;const o=[];return this.zones[t].groups[e].forEach(t=>{r&&n?d.distanceToSquared(r,t.centroid)<n*n&&o.push(t.centroid):o.push(t.centroid)}),d.sample(o)||new s}getClosestNode(t,e,s,r=!1){const n=this.zones[e].vertices;let o=null,i=Infinity;return this.zones[e].groups[s].forEach(e=>{const s=d.distanceToSquared(e.centroid,t);s<i&&(!r||d.isVectorInPolygon(t,e,n))&&(o=e,i=s)}),o}findPath(t,e,r,n){const o=this.zones[r].groups[n],i=this.zones[r].vertices,h=this.getClosestNode(t,r,n,!0),c=this.getClosestNode(e,r,n,!0);if(!h||!c)return null;const a=g.search(o,h,c),u=function(t,e){for(var s=0;s<t.neighbours.length;s++)if(t.neighbours[s]===e.id)return t.portals[s]},l=new v;l.push(t);for(let t=0;t<a.length;t++){const e=a[t+1];if(e){const s=u(a[t],e);l.push(i[s[0]],i[s[1]])}}l.push(e),l.stringPull();const d=l.path.map(t=>new s(t.x,t.y,t.z));return d.shift(),d}}b.prototype.getGroup=function(){const t=new r;return function(e,s,r=!1){if(!this.zones[e])return null;let n=null,o=Math.pow(50,2);const i=this.zones[e];for(let e=0;e<i.groups.length;e++){const h=i.groups[e];for(const c of h){if(r&&(t.setFromCoplanarPoints(i.vertices[c.vertexIds[0]],i.vertices[c.vertexIds[1]],i.vertices[c.vertexIds[2]]),Math.abs(t.distanceToPoint(s))<.01)&&d.isPointInPoly([i.vertices[c.vertexIds[0]],i.vertices[c.vertexIds[1]],i.vertices[c.vertexIds[2]]],s))return e;const h=d.distanceToSquared(c.centroid,s);h<o&&(n=e,o=h)}}return n}}(),b.prototype.clampStep=function(){const t=new s,e=new r,o=new n,i=new s;let h,c,a=new s;return function(s,r,n,u,l,d){const p=this.zones[u].vertices,g=this.zones[u].groups[l],f=[n],v={};v[n.id]=0,h=void 0,a.set(0,0,0),c=Infinity,e.setFromCoplanarPoints(p[n.vertexIds[0]],p[n.vertexIds[1]],p[n.vertexIds[2]]),e.projectPoint(r,t),i.copy(t);for(let e=f.pop();e;e=f.pop()){o.set(p[e.vertexIds[0]],p[e.vertexIds[1]],p[e.vertexIds[2]]),o.closestPointToPoint(i,t),t.distanceToSquared(i)<c&&(h=e,a.copy(t),c=t.distanceToSquared(i));const s=v[e.id];if(!(s>2))for(let t=0;t<e.neighbours.length;t++){const r=g[e.neighbours[t]];r.id in v||(f.push(r),v[r.id]=s+1)}}return d.copy(a),h}}();class w extends o{constructor(){super(),this._playerMarker=new i(new h(.25,32,32),new c({color:15631215})),this._targetMarker=new i(new a(.3,.3,.3),new c({color:14469912})),this._nodeMarker=new i(new a(.1,.8,.1),new c({color:4417387})),this._stepMarker=new i(new a(.1,1,.1),new c({color:14472114})),this._pathMarker=new o,this._pathLineMaterial=new u({color:41903,linewidth:2}),this._pathPointMaterial=new c({color:41903}),this._pathPointGeometry=new h(.08),this._markers=[this._playerMarker,this._targetMarker,this._nodeMarker,this._stepMarker,this._pathMarker],this._markers.forEach(t=>{t.visible=!1,this.add(t)})}setPath(s){for(;this._pathMarker.children.length;)this._pathMarker.children[0].visible=!1,this._pathMarker.remove(this._pathMarker.children[0]);s=[this._playerMarker.position].concat(s);const r=new e;r.setAttribute("position",new t(new Float32Array(3*s.length),3));for(let t=0;t<s.length;t++)r.attributes.position.setXYZ(t,s[t].x,s[t].y+.2,s[t].z);this._pathMarker.add(new l(r,this._pathLineMaterial));for(let t=0;t<s.length-1;t++){const e=new i(this._pathPointGeometry,this._pathPointMaterial);e.position.copy(s[t]),e.position.y+=.2,this._pathMarker.add(e)}return this._pathMarker.visible=!0,this}setPlayerPosition(t){return this._playerMarker.position.copy(t),this._playerMarker.visible=!0,this}setTargetPosition(t){return this._targetMarker.position.copy(t),this._targetMarker.visible=!0,this}setNodePosition(t){return this._nodeMarker.position.copy(t),this._nodeMarker.visible=!0,this}setStepPosition(t){return this._stepMarker.position.copy(t),this._stepMarker.visible=!0,this}reset(){for(;this._pathMarker.children.length;)this._pathMarker.children[0].visible=!1,this._pathMarker.remove(this._pathMarker.children[0]);return this._markers.forEach(t=>{t.visible=!1}),this}}export{b as Pathfinding,w as PathfindingHelper};
//# sourceMappingURL=three-pathfinding.module.js.map
