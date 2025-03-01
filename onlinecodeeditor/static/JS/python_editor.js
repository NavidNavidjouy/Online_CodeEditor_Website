function customInput(promptMessage) {
    return prompt(promptMessage);
}


async function runPython() {
    const pythonCode = editor.getValue();
    
    if (!pyodide) {
        outputElement.textContent = '>>> editor still loading. Please wait...';
        return;
    }

    try {
        outputElement.textContent = '>>> Running...\n';
        
 
        pyodide.globals.set('input', customInput);
        
        await pyodide.runPythonAsync(pythonCode);
        outputElement.textContent += '\n>>> Execution finished\n';
    } catch (error) {
        outputElement.textContent += `\nError: ${error.message}\n`;
    }
}


const editor = CodeMirror.fromTextArea(document.getElementById('pythonCode'), {
    mode: 'python',
    theme: 'monokai',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    autoCloseBrackets: true, 
    autoCloseTags: true, 
    autoCloseQuotes: true, 
    matchBrackets: true, 
    extraKeys: {
        'Ctrl-Enter': runPython,
        'Cmd-Enter': runPython,
        'Ctrl-Space': 'autocomplete' 
    },
    hintOptions: {
        hint: CodeMirror.hint.python, 
        completeSingle: false
    }
});

let pyodide;
let outputElement = document.getElementById('output');


function handleOutput(text) {
    outputElement.textContent += text;
}


async function initializePyodide() {
    pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
        stdout: handleOutput,
        stderr: handleOutput
    });
    outputElement.textContent = '>>> Editor loaded successfully!\n';
}


async function runPython() {
    const pythonCode = editor.getValue();
    
    if (!pyodide) {
        outputElement.textContent = '>>> Editor is still loading. Please wait...';
        return;
    }

    try {
        outputElement.textContent = '>>> Running...\n';
        await pyodide.runPythonAsync(pythonCode);
        outputElement.textContent += '\n>>> Execution finished\n';
    } catch (error) {
        outputElement.textConشtent += `\nError: ${error.message}\n`;
    }
}


function resetEditor() {
    editor.setValue('');
    outputElement.textContent = '';
}


editor.on('inputRead', (cm, input) => {
    if (input.text && input.text[0] !== ';' && input.text[0] !== ' ') {
        CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
    }
});


initializePyodide();