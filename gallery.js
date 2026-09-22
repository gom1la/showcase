// Keep each original desktop design intact at every gallery-card width.
const resize = new ResizeObserver(entries => {
  for (const {target} of entries) {
    const frame=target.querySelector('iframe');
    if (!frame || !target.clientWidth) continue;
    const scale=target.clientWidth/1440;
    frame.style.width='1440px';
    frame.style.height=`${Math.ceil(target.clientHeight/scale)}px`;
    frame.style.transform=`scale(${scale})`;
  }
});
document.querySelectorAll('.real-preview').forEach(card=>resize.observe(card));
