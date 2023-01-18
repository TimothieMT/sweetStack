import { expect } from '@jest/globals';
import createProject from "./bin/createProject.js";
import reactHooks from "./bin/reactHooks.js";
import angularFrontend from "./bin/angularFrontend.js";

test('createProject() is correctly implemented', () => {
    expect(createProject({answers, absolutePath, destPath})).toBe(angularFrontend({from, to, answers}));
});