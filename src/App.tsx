import React from 'react';
import { CardEditor } from './components/CardEditor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Card Game Designer</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow min-h-[calc(100vh-8rem)]">
          <CardEditor />
        </div>
      </main>
    </div>
  );
}

export default App;