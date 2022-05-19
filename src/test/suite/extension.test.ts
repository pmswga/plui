import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Get Lui translator', () => {
		let luiTranslator = vscode.workspace.getConfiguration('plui').get<string>("luiTranslator");

		assert.strictEqual('none', luiTranslator);
	});

	test('Get Python interpreter', () => {
		let pythonInterpreter = vscode.workspace.getConfiguration('plui').get<string>("pythonInterpreter");

		assert.strictEqual('none', pythonInterpreter);
	});

});
