export function generateGrid(crosswordData) {
    const gridSize = 15; // Example grid size, can be adjusted
    let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
  
    // Sort words by length in descending order
    const sortedData = [...crosswordData].sort((a, b) => b.answer.length - a.answer.length);
  
    for (let { answer } of sortedData) {
      let placed = false;
      for (let row = 0; row < gridSize && !placed; row++) {
        for (let col = 0; col < gridSize && !placed; col++) {
          // Try placing the word horizontally
          if (canPlaceWordHorizontally(grid, row, col, answer)) {
            placeWordHorizontally(grid, row, col, answer);
            placed = true;
          } 
          // Try placing the word vertically
          else if (canPlaceWordVertically(grid, row, col, answer)) {
            placeWordVertically(grid, row, col, answer);
            placed = true;
          }
        }
      }
    }
  
    return grid;
  }
  
  function canPlaceWordHorizontally(grid, row, col, word) {
    if (col + word.length > grid.length) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) {
        return false;
      }
    }
    return true;
  }
  
  function placeWordHorizontally(grid, row, col, word) {
    for (let i = 0; i < word.length; i++) {
      grid[row][col + i] = word[i];
    }
  }
  
  function canPlaceWordVertically(grid, row, col, word) {
    if (row + word.length > grid.length) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) {
        return false;
      }
    }
    return true;
  }
  
  function placeWordVertically(grid, row, col, word) {
    for (let i = 0; i < word.length; i++) {
      grid[row + i][col] = word[i];
    }
  }
  