require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@latest/min/vs' } });

require(['vs/editor/editor.main'], function () {
  const editor = monaco.editor.create(document.getElementById('editor'), {
    value: `#include <stdio.h>\n\nvoid main() {\n  // Escreva seu kernel aqui\n}`,
    language: 'c',
    theme: 'vs-dark'
  });

  document.getElementById('build').onclick = async () => {
    const code = editor.getValue();

    // Aqui você mandaria para seu backend real
    const form = new FormData();
    form.append("main.c", new Blob([code], { type: "text/plain" }));

    const status = document.getElementById("status");
    status.innerText = "Enviando para compilação...";

    const response = await fetch("https://SEU_BACKEND_API/build", {
      method: "POST",
      body: form
    });

    if (response.ok) {
      const json = await response.json();
      status.innerHTML = `<a href="${json.iso_url}" target="_blank">Download ISO</a>`;
    } else {
      status.innerText = "Erro ao compilar.";
    }
  };
});
