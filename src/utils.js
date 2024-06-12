export const generateGrid = () => {
  const grid = [];
  for (let i = 0; i < 20; i++) {
    grid.push(new Array(20).fill('⚫'));
  }
  return grid;
};

export const randomPosition = (exclude) => {
  let pos;
  do {
    pos = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
  } while (exclude.some(ex => ex[0] === pos[0] && ex[1] === pos[1]));
  return pos;
};
