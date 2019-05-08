import { Domain } from './domain';

export const DOMAINS: Domain[] = [
  { id: 10, parentId: null, name: '/prefix14', desc: 'A description', _display: true },
  { id: 27, parentId: null, name: '/prefix12', desc: 'A description', _display: true },
  { id: 28, parentId: null, name: '/prefix13', desc: 'A description', _display: true },
  { id: 20, parentId: 28, name: '/prefix13/name4', desc: 'A description', _display: true },
  { id: 11, parentId: 10, name: '/prefix14/name4', desc: 'A description', _display: true },
  { id: 12, parentId: 10, name: '/prefix14/name1', desc: 'A description', _display: true },
  { id: 19, parentId: 11, name: '/prefix14/name4/name1', desc: 'A description', _display: true },
  { id: 13, parentId: 27, name: '/prefix12/name1', desc: 'A description', _display: true },
  { id: 14, parentId: 27, name: '/prefix12/name2', desc: 'A description', _display: true },
  { id: 16, parentId: 14, name: '/prefix12/name2/name1', desc: 'A description', _display: true },
  { id: 17, parentId: 14, name: '/prefix12/name2/name2', desc: 'A description', _display: true }
];
