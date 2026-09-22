import {cp,readFile,writeFile,mkdir} from 'node:fs/promises';

export async function integrateSites(templates,out){
  for(const t of templates){
    const source=new URL(`./${t.source}/`,import.meta.url);
    const folder=new URL(`webs/${t.slug}/`,out);
    await mkdir(folder,{recursive:true});
    await cp(source,folder,{recursive:true});
    const original=await readFile(new URL('index.html',source),'utf8');
    const base=`<base href="/webs/${t.slug}/"><link rel="icon" href="/favicon.svg">`;
    const returnLink='<a class="dg-portfolio-return" href="/#webs">← Daniel Gomila</a><style>.dg-portfolio-return{position:fixed;bottom:18px;left:18px;z-index:9999;background:#000;color:#fff!important;border:1px solid #fff5;border-radius:24px;padding:12px 18px;font:500 13px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-decoration:none;box-shadow:0 3px 15px #0003}.dg-portfolio-return:focus-visible{outline:3px solid #075bea;outline-offset:3px}@media print{.dg-portfolio-return{display:none}}</style>';
    await writeFile(new URL('index.html',folder),original.replace(/<head>/i,`<head>${base}`).replace(/<\/body>/i,`${returnLink}</body>`));
    // The gallery renders only each original header and hero, not twenty whole sites.
    const head=original.match(/<head>([\s\S]*?)<\/head>/i)?.[1]||'';
    const header=original.match(/<header\b[\s\S]*?<\/header>/i)?.[0]||'';
    const hero=original.match(/<section\b[^>]*class="[^"]*\bhero\b[^"]*"[\s\S]*?<\/section>/i)?.[0];
    if(!hero)throw new Error(`Missing original hero: ${t.slug}`);
    const previewHero=hero.replace(/<video\b([\s\S]*?)<\/video>/gi,(video)=>{
      const poster=video.match(/poster="([^"]+)"/)?.[1] || original.match(/<img\b[^>]*src="([^"]+)"/)?.[1];
      return poster ? `<img class="hero-video visible" src="${poster}" alt="${t.name} website cover">` : video;
    });
    const previewCss='<style>html,body{overflow:hidden!important;scroll-behavior:auto!important}*,*::before,*::after{animation:none!important;transition:none!important}.reveal,.section-motion{opacity:1!important;transform:none!important;visibility:visible!important;filter:none!important}.hero{min-height:0!important;height:calc(100vh - 78px)!important;padding-bottom:6vh!important}.hero h1{font-size:min(8.5vw,14vh)!important}.hero-copy{opacity:1!important;transform:none!important}.hero-video{opacity:1!important}a,button{pointer-events:none!important}</style>';
    await writeFile(new URL('preview.html',folder),`<!doctype html><html lang="${t.slug==='madison'?'es':'en'}"><head>${base}${head}${previewCss}</head><body>${header}<main>${previewHero}</main></body></html>`);
  }
}
