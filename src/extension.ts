import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let panel: vscode.WebviewPanel | undefined = undefined;

	let translate = vscode.commands.registerCommand('plui.translate', () => {
		const message = 'File translate successfully';
		vscode.window.showInformationMessage(message);
	});

	let selectTranslator = vscode.commands.registerCommand('plui.selectTranslator', () => {
		const message = 'Translator selected successfully';
		
		vscode.window.showOpenDialog()
		.then( answer => {
			console.log(answer?.toString)
			
			if (answer !== undefined) {
				vscode.window.showInformationMessage(answer.toString());
			}
		});

		vscode.window.showInformationMessage(message);
	});

	let selectPythonTranslator = vscode.commands.registerCommand('plui.selectPythonTranslator', () => {
		const message = 'selectPythonTranslator';
		vscode.window.showInformationMessage(message);
	});

	let runPythonScript = vscode.commands.registerCommand('plui.runPythonScript', () => {
		const message = 'runPythonScript';
		vscode.window.showInformationMessage(message);
	});

	context.subscriptions.push(translate);
	context.subscriptions.push(selectTranslator);
	context.subscriptions.push(selectPythonTranslator);
	context.subscriptions.push(runPythonScript);
}

export function deactivate() {}
