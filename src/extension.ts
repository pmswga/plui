import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { TaskDefinition } from 'vscode';
import { ShellExecutionOptions } from 'vscode';
import { ShellQuotedString } from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let panel: vscode.WebviewPanel | undefined = undefined;

	let selectLuiTranslator = vscode.commands.registerCommand('plui.selectLuiTranslator', () => {
		vscode.window.showOpenDialog(
			{
				"filters": {
					'Executable': ['exe']
				}
			}
		)
		.then( answer => {
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
				let luiTranslator = vscode.workspace.getConfiguration('plui').get<string>("luiTranslator");
				let currentFile = vscode.window.activeTextEditor?.document.fileName;

				if (luiTranslator !== undefined && currentFile !== undefined) {
					//let shellCommand = luiTranslator + " --file=" + currentFile;
					let task = new vscode.Task(
						{ type: 'lui', task: 'translate'},
						activeWsf,
						'lui translating',
						'lui',
						new vscode.ShellExecution(
							{
								quoting: vscode.ShellQuoting.Strong,
								value: luiTranslator
							},
							[
								{
									quoting: vscode.ShellQuoting.Strong,
									value: '--file=' + currentFile
								}
							]
						)
					);
		
					vscode.tasks.executeTask(task)
				} else if (luiTranslator === undefined) {
					vscode.window.showErrorMessage('Lui translator not selected');
				} else {
					vscode.window.showErrorMessage('Current file not opened');
				}
			} else {
				vscode.window.showErrorMessage('Lui translator not selected');
			}
		}
	});

	let selectPythonTranslator = vscode.commands.registerCommand('plui.selectPythonTranslator', () => {		
		vscode.window.showOpenDialog(
			{
				"filters": {
					'Executable': ['exe']
				}
			}
		)
		.then( answer => {
			if (answer !== undefined) {
				vscode.window.showInformationMessage("Translator was be selected");
				vscode.workspace.getConfiguration('plui').update('pythonTranslator', answer[0].fsPath);
			}
		});
	});

	let runPythonScript = vscode.commands.registerCommand('plui.runPythonScript', () => {
		let wsf = vscode.workspace.workspaceFolders;

		if (wsf !== undefined) {
			let activeWsf = wsf[0];
			
			if (vscode.workspace.getConfiguration('plui').has('pythonTranslator')) {
				let pythonTranslator = vscode.workspace.getConfiguration('plui').get<string>("pythonTranslator");
				let currentFile = vscode.window.activeTextEditor?.document.fileName;

				if (pythonTranslator !== undefined && currentFile !== undefined) {
					let task = new vscode.Task(
						{ type: 'python', task: 'run'},
						activeWsf,
						'run script',
						'python',
						new vscode.ShellExecution(
							{
								quoting: vscode.ShellQuoting.Strong, 
								value: pythonTranslator
							}, 
							[ 
								{
									quoting: vscode.ShellQuoting.Strong,
									value: currentFile
								}
							]
						)
					);
		
					vscode.tasks.executeTask(task)
				} else if (pythonTranslator === undefined) {
					vscode.window.showErrorMessage('Python translator not selected');
				} else {
					vscode.window.showErrorMessage('Current file not opened');
				}
			} else {
				vscode.window.showErrorMessage('Python translator not selected');
			}
		}
	});

	context.subscriptions.push(selectLuiTranslator);
	context.subscriptions.push(translateLuiFile);
	context.subscriptions.push(selectPythonTranslator);
	context.subscriptions.push(runPythonScript);
}

export function deactivate() {}
