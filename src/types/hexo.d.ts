import type Hexo from 'hexo';

interface Model<T> {
  /**
   * Warehouse method
   * https://hexojs.github.io/warehouse/
   */
  toArray(): T[];
  /**
   * Warehouse method
   * https://hexojs.github.io/warehouse/
   */
  count(): number;
  /**
   * Warehouse method
   * https://hexojs.github.io/warehouse/
   */
  forEach(fn: (v: T, i: number) => void): void;
  /**
   * Warehouse method
   * https://hexojs.github.io/warehouse/
   */
  filter(fn: (v: T, i: number) => boolean): Model<T>;
  /**
   * Warehouse method
   * https://hexojs.github.io/warehouse/
   */
  map<U>(fn: (v: T, i: number) => U): U[];
}

type IHexo = Hexo & {
  Site: {
    posts: Model<Hexo.Locals.Post>;
    pages: Model<Hexo.Locals.Page>;
    categories: Model<Hexo.Locals.Category>;
    tags: Model<Hexo.Locals.Tag>;
    data: { [key: string]: never };
  };
  Posts: Hexo.Locals.Post[];
  Return: Hexo.extend.Generator.Return;
};

export default IHexo;
