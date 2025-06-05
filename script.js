function download(filename, text) {
  const element = document.createElement('a');
  const file = new Blob([text], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

document.getElementById('downloadBtn').addEventListener('click', () => {
  const kernel = document.getElementById('kernel').value;
  const boot = document.getElementById('boot').value;
  const linker = document.getElementById('linker').value;
  const makefile = document.getElementById('makefile').value;

  if (kernel.trim()) download('kernel.c', kernel);
  if (boot.trim()) download('boot.asm', boot);
  if (linker.trim()) download('linker.ld', linker);
  if (makefile.trim()) download('Makefile', makefile);
});
