// --- Mock Data for the Application ---

const codeSnippets = {
    'App.js': `<span class="syntax-k">import</span> React, { useState } <span class="syntax-k">from</span> <span class="syntax-s">'react'</span>;
<span class="syntax-k">export default function</span> <span class="syntax-f">App</span>() {
  <span class="syntax-k">const</span> [count, setCount] = <span class="syntax-f">useState</span>(0);
  <span class="syntax-k">return</span> (
    &lt;div&gt;
      &lt;h1&gt;Hello World&lt;/h1&gt;
    &lt;/div&gt;
  );
}`,
    'Index.js': `<span class="syntax-k">import</span> React <span class="syntax-k">from</span> <span class="syntax-s">'react'</span>;
<span class="syntax-k">import</span> ReactDOM <span class="syntax-k">from</span> <span class="syntax-s">'react-dom'</span>;
<span class="syntax-k">import</span> App <span class="syntax-k">from</span> <span class="syntax-s">'./App'</span>;

ReactDOM.render(&lt;App /&gt;, document.getElementById(<span class="syntax-s">'root'</span>));`,
    'Utils.js': `<span class="syntax-k">export const</span> formatDate = (date) => {
  <span class="syntax-k">return</span> date.toLocaleDateString();
};

<span class="syntax-k">export const</span> generateId = () => Math.random().toString(36);`,
    'Button.js': `<span class="syntax-k">const</span> Button = ({ children, onClick }) => {
  <span class="syntax-k">return</span> (
    &lt;button onClick={onClick}&gt;{children}&lt;/button&gt;
  );
};
<span class="syntax-k">export default</span> Button;`,
    'Modal.js': `<span class="syntax-k">import</span> React <span class="syntax-k">from</span> <span class="syntax-s">'react'</span>;

<span class="syntax-k">const</span> Modal = ({ isOpen }) => {
  <span class="syntax-k">if</span> (!isOpen) <span class="syntax-k">return null</span>;
  <span class="syntax-k">return</span> &lt;div className=<span class="syntax-s">"modal"</span>&gt;Content&lt;/div&gt;;
};`
};

const agentLogs = [
    { time: '10:42 AM', msg: 'Environment setup complete.' },
    { time: '10:45 AM', msg: 'Fetching dependencies from npm...' },
    { time: '10:48 AM', msg: 'Agent: Analyzing project structure.' },
    { time: '11:00 AM', msg: 'User: Update configuration.' }
];

const timelineData = [
    { date: 'Jan 15, 2026', title: 'Project Kickoff', desc: 'Initial requirements gathered.' },
    { date: 'Jan 16, 2026', title: 'Design Phase', desc: 'UI/UX wireframes approved.' },
    { date: 'Jan 17, 2026', title: 'Development Sprint', desc: 'Core modules implementation started.' }
];

const commitHistory = [
    { hash: 'a1b2c3d', msg: 'Initial commit', author: 'DevOne' },
    { hash: 'e4f5g6h', msg: 'Add login page', author: 'DevTwo' },
    { hash: 'i7j8k9l', msg: 'Fix CSS bug', author: 'DevOne' },
    { hash: 'm0n1o2p', msg: 'Update API', author: 'Agent' }
];              