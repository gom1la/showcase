import {readFile,stat,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import {templates} from './templates.mjs';
const home=await readFile('dist/index.html','utf8');
assert.equal(new Set(templates.map(t=>t.slug)).size,templates.length);
let assets=0;
for(const t of templates){
 assert(home.includes(`href="/webs/${t.slug}/"`));
 const root=`dist/webs/${t.slug}`;
 const page=await readFile(`${root}/index.html`,'utf8');
 assert(page.includes(`<base href="/webs/${t.slug}/">`));
 assert(page.includes('href="/#webs"'));
 const preview=await readFile(`${root}/preview.html`,'utf8');
 assert(preview.includes('class="hero'));
 assert(!preview.includes('<script'));
 async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){await walk(file);continue;}if(!/\.(html|css)$/.test(file))continue;const text=await readFile(file,'utf8');const refs=[...text.matchAll(/(?:src|href|poster)="([^"<>]+)"/g)].map(m=>m[1]);if(file.endsWith('.css'))refs.push(...[...text.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(m=>m[1]));for(let ref of refs){if(/^(?:[a-z]+:|#|\/\/)/i.test(ref))continue;ref=decodeURIComponent(ref.split(/[?#]/)[0]);if(!ref)continue;const target=ref.startsWith('/')?path.join('dist',ref):path.join(file.endsWith('.css')?path.dirname(file):root,ref);const info=await stat(target);assert(info.isFile() || (info.isDirectory() && (await stat(path.join(target,'index.html'))).isFile()),`${file}: missing ${ref}`);assets++;}}}
 await walk(root);
}
for(const id of ['webs','pricing','how-it-works','contact'])assert(home.includes(`id="${id}"`));
assert(home.includes('action="https://formsubmit.co/danielwebs26@gmail.com"'));
console.log(`PASS: ${templates.length} original sites, gallery links, previews, contact and ${assets} local references.`);
