"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
// import * as myExtension from '../../extension';
suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    test('Get Lui translator', () => {
        let luiTranslator = vscode.workspace.getConfiguration('plui').get("luiTranslator");
        assert.strictEqual('none', luiTranslator);
    });
    test('Get Python interpreter', () => {
        let pythonInterpreter = vscode.workspace.getConfiguration('plui').get("pythonInterpreter");
        assert.strictEqual('none', pythonInterpreter);
    });
});
//# sourceMappingURL=extension.test.js.map