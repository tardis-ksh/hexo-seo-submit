import Hexo from '@/types/hexo';

const generators = (locals: Hexo['Site']): Hexo['Return'] => {
  console.log('generators', locals);
  return { data: '123', path: 'test.txt' };
};

export default generators;
