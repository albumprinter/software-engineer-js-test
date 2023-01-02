import { createRoot } from 'react-dom/client';
import PhotoEditor from './features/photo-editor';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<PhotoEditor />);
