"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let panel = undefined;
    let selectLuiTranslator = vscode.commands.registerCommand('plui.selectLuiTranslator', () => {
        vscode.window.showOpenDialog({
            "filters": {
                'Executable': ['exe']
            }
        })
            .then(answer => {
            if (answer !== undefined) {
                vscode.window.showInformationMessage("Translator was be selected");
                vscode.workspace.getConfiguration('plui').update('luiTranslator', answer[0].fsPath);
            }
        });
    });
    let translateLuiFile = vscode.commands.registerCommand('plui.translateLuiFile', () => {
        let wsf = vscode.workspace.workspaceFolders;
        if (wsf !== undefined) {
            let activeWsf = wsf[0];
            if (vscode.workspace.getConfiguration('plui').has('luiTranslator')) {
                let luiTranslator = vscode.workspace.getConfiguration('plui').get("luiTranslator");
                let currentFile = vscode.window.activeTextEditor?.document.fileName;
                if (luiTranslator !== undefined && currentFile !== undefined) {
                    let task = new vscode.Task({ type: 'lui', task: 'translate' }, activeWsf, 'lui translating', 'lui', new vscode.ShellExecution({
                        quoting: vscode.ShellQuoting.Strong,
                        value: luiTranslator
                    }, [
                        {
                            quoting: vscode.ShellQuoting.Strong,
                            value: '--file=' + currentFile
                        }
                    ]));
                    vscode.tasks.executeTask(task);
                }
                else if (luiTranslator === undefined) {
                    vscode.window.showErrorMessage('Lui translator not selected');
                }
                else {
                    vscode.window.showErrorMessage('Current file not opened');
                }
            }
            else {
                vscode.window.showErrorMessage('Lui translator not selected');
            }
        }
    });
    let selectPythonInterpreter = vscode.commands.registerCommand('plui.selectPythonInterpreter', () => {
        vscode.window.showOpenDialog({
            "filters": {
                'Executable': ['exe']
            }
        })
            .then(answer => {
            if (answer !== undefined) {
                vscode.window.showInformationMessage("Translator was be selected");
                vscode.workspace.getConfiguration('plui').update('pythonInterpreter', answer[0].fsPath);
            }
        });
    });
    let runPythonScript = vscode.commands.registerCommand('plui.runPythonScript', () => {
        let wsf = vscode.workspace.workspaceFolders;
        if (wsf !== undefined) {
            let activeWsf = wsf[0];
            if (vscode.workspace.getConfiguration('plui').has('pythonInterpreter')) {
                let pythonTranslator = vscode.workspace.getConfiguration('plui').get("pythonInterpreter");
                let currentFile = vscode.window.activeTextEditor?.document.fileName;
                if (pythonTranslator !== undefined && currentFile !== undefined) {
                    let task = new vscode.Task({ type: 'python', task: 'run' }, activeWsf, 'run script', 'python', new vscode.ShellExecution({
                        quoting: vscode.ShellQuoting.Strong,
                        value: pythonTranslator
                    }, [
                        {
                            quoting: vscode.ShellQuoting.Strong,
                            value: currentFile
                        }
                    ]));
                    vscode.tasks.executeTask(task);
                }
                else if (pythonTranslator === undefined) {
                    vscode.window.showErrorMessage('Python interpreter not selected');
                }
                else {
                    vscode.window.showErrorMessage('Current file not opened');
                }
            }
            else {
                vscode.window.showErrorMessage('Python interpreter not selected');
            }
        }
    });
    context.subscriptions.push(selectLuiTranslator);
    context.subscriptions.push(translateLuiFile);
    context.subscriptions.push(selectPythonInterpreter);
    context.subscriptions.push(runPythonScript);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map