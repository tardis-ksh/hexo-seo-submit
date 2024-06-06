import * as path from 'node:path';

const fn = (params: string) => {
  console.log(params, path);
  return 123;
};

const testFunc = (props) => {
  console.log(props, fn('132'));
  return 'Hello World';
};

export default testFunc;
