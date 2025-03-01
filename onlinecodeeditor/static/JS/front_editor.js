const editorConfig = {
    lineNumbers: true,
    theme: 'monokai',
    autoCloseTags: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
        "Ctrl-Space": "autocomplete", 
        "Tab": "emmetExpandAbbreviation", 
        "Esc": "emmetResetAbbreviation",
        "Enter": "emmetInsertLineBreak"
    }
};


const editors = {
    html: CodeMirror.fromTextArea(document.getElementById('htmlCode'), {
        ...editorConfig,
        mode: 'htmlmixed',
        hintOptions: {
            completeSingle: false, 
            htmlSchema: true 
        }
    }),
    css: CodeMirror.fromTextArea(document.getElementById('cssCode'), {
        ...editorConfig,
        mode: 'css',
        hintOptions: {
            completeSingle: false,
            cssSchema: true 
        }
    }),
    js: CodeMirror.fromTextArea(document.getElementById('jsCode'), {
        ...editorConfig,
        mode: 'javascript',
        hintOptions: {
            completeSingle: false,
            globalScope: window 
        }
    })
};

Object.values(editors).forEach(editor => {
    editor.on('inputRead', (instance) => {
        if (instance.state.completionActive) return; 
        CodeMirror.commands.autocomplete(instance, null, {
            completeSingle: false
        });
    });
});


function updatePreview() {
    const html = editors.html.getValue();
    const css = `<style>${editors.css.getValue()}</style>`;
    const js = `<script>${editors.js.getValue()}<\/script>`;
    
    const preview = document.getElementById('preview').contentWindow.document;
    preview.open();
    preview.write(html + css + js);
    preview.close();
}


Object.values(editors).forEach(editor => {
    editor.on('change', () => {
        updatePreview();
        localStorage.setItem('savedCode', JSON.stringify({
            html: editors.html.getValue(),
            css: editors.css.getValue(),
            js: editors.js.getValue()
        }));
    });
});


window.addEventListener('load', () => {
    const savedCode = localStorage.getItem('savedCode');
    if (savedCode) {
        const code = JSON.parse(savedCode);
        editors.html.setValue(code.html);
        editors.css.setValue(code.css);
        editors.js.setValue(code.js);
    }
    updatePreview();
});
