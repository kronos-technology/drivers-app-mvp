import { path } from 'app-root-path';
import { join } from 'path';

function getFunctionPath(pathFromFunctionsDir: string) {
  return join(path, `dist/functions/${pathFromFunctionsDir}`);
}

function getRootPath(pathFromRoot: string) {
  return join(path, pathFromRoot);
}

function getMappingTemplatePath(entity: string, mappingTemplateName: string) {
  return join(path, `./lib/mapping-templates/${entity}/${mappingTemplateName}`);
}

export { getFunctionPath, getRootPath, getMappingTemplatePath };
