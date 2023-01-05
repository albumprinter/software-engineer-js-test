import React from "react";
import { createRoot } from 'react-dom/client';
import { PhotoEditor } from './components/photo-editor';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<PhotoEditor />);
