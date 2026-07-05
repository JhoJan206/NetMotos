import Fuse from 'fuse.js';

const fuseOptions = {
  keys: [
    { name: 'nombre_completo', weight: 2 },
    { name: 'marca', weight: 1.5 },
    { name: 'modelo', weight: 1.5 },
    { name: 'tipo', weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
};

let fuseInstance = null;

export function initFuse(motos) {
  fuseInstance = new Fuse(motos, fuseOptions);
}

export function searchMotos(query) {
  if (!fuseInstance) return [];
  if (!query || query.trim() === '') return [];
  return fuseInstance.search(query).map(r => r.item);
}
