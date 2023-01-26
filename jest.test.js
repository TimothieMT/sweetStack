import { expect } from '@jest/globals';
import createProject from "./bin/createProject.js";
import reactFrontend from "./bin/reactFrontend.js";

test('createProject() is correctly implemented', () => {
    expect(createProject(answers, from , to)).toBe(reactFrontend(answers, from , to));
});