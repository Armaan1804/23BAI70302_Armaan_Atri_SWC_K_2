import { useState } from 'react';

// Custom hook to manage state history with undo/redo stacks
function useUndoRedo() {
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Add a new state. This clears the redo stack since it is a new path
  const set = (newPresent) => {
    setHistory([...history, newPresent]);
    setRedoStack([]);
  };

  // Undo pops from history and pushes to redoStack
  const undo = () => {
    if (history.length === 0) return;
    const newHistory = [...history];
    const popped = newHistory.pop();
    setHistory(newHistory);
    setRedoStack([...redoStack, popped]);
  };

  // Redo pops from redoStack and pushes to history
  const redo = () => {
    if (redoStack.length === 0) return;
    const newRedoStack = [...redoStack];
    const popped = newRedoStack.pop();
    setHistory([...history, popped]);
    setRedoStack(newRedoStack);
  };

  // Jump to a specific state in the timeline
  const jumpTo = (index) => {
    if (index >= 0 && index < history.length) {
      const newHistory = history.slice(0, index + 1);
      const poppedItems = history.slice(index + 1);
      setHistory(newHistory);
      // Reverse popped items so that they are redone in the correct order
      setRedoStack([...redoStack, ...poppedItems.reverse()]);
    }
  };

  // Clear all states
  const clear = () => {
    setHistory([]);
    setRedoStack([]);
  };

  // The active state is the most recent/last item in the history list
  const state = history.length > 0 ? history[history.length - 1] : '';

  return {
    state,
    history,
    set,
    undo,
    redo,
    jumpTo,
    clear,
    canUndo: history.length > 0,
    canRedo: redoStack.length > 0
  };
}

export default function App() {
  const {
    state,
    history,
    set,
    undo,
    redo,
    jumpTo,
    clear,
    canUndo,
    canRedo
  } = useUndoRedo();

  const [inputValue, setInputValue] = useState('');

  // Parse input string helper (supports Number, Boolean, Array, Object, String)
  const parseInputValue = (val) => {
    const trimmed = val.trim();
    if (trimmed === '') return '';
    
    // Check if it's a number
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
      return Number(trimmed);
    }
    
    // Check if it is a boolean
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    
    // Check if it is null
    if (trimmed === 'null') return null;

    // Try to parse as JSON for Array/Object
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      // Fallback to string
      return trimmed;
    }
  };

  const formatValue = (val) => {
    if (val === null) return 'null';
    if (typeof val === 'object') {
      return JSON.stringify(val);
    }
    return String(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const parsed = parseInputValue(inputValue);
    set(parsed);
    setInputValue('');
  };

  return (
    <div>
      <div>
        {/* h1 header displaying the active (most recent) state value */}
        <h1>{formatValue(state)}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="input-box">Input: </label>
        <input
          id="input-box"
          type="text"
          placeholder="Enter string, number, array, or object"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Push to History</button>
      </form>

      <div>
        <button type="button" onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button type="button" onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <button type="button" onClick={clear}>
          Clear
        </button>
      </div>

      <div>
        <h3>Timeline</h3>
        <ul>
          {history.map((item, idx) => (
            <li key={idx} onClick={() => jumpTo(idx)}>
              {typeof item === 'object' ? JSON.stringify(item) : String(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
