const path = require('path');
window.ipc = require('electron').ipcRenderer;
const amd = require('./node_modules/monaco-editor/min/vs/loader.js');

function uriFromPath(_path) {
  var pathName = path.resolve(_path).replace(/\\/g, '/');
  if (pathName.length > 0 && pathName.charAt(0) !== '/') {
    pathName = '/' + pathName;
  }
  return encodeURI('file://' + pathName);
}

amd.require.config({
  baseUrl: uriFromPath(path.join(__dirname, './node_modules/monaco-editor/min'))
});

// workaround monaco-css not understanding the environment
self.module = undefined;

amd.require(['vs/editor/editor.main'], () => {
  ready();
});

// Actual logic

function ready() {
  const editorEl = document.getElementById('editor');
  let editor;

  editor = monaco.editor.create(editorEl, {
    value: SAMPLE.trim(),
    language: 'html',
    theme: 'vs-dark',
  });

  adjustSizes();
  window.onresize = () => adjustSizes();

  sendNewSrc();
  editor.onDidChangeModelContent(() => sendNewSrc());

  function sendNewSrc() {
    ipc.send('src-changed', editor.getValue());
  }

  function adjustSizes() {
    editorEl.style.width = (window.innerWidth) + 'px';
    editorEl.style.height = (window.innerHeight) + 'px';
    editor.layout();
  }
}

const SAMPLE = `
<style>
    
html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12pt;
}

#root {
  display: grid;
  gap: 2em;
  align-content: start;
}

a {
  color: #06f;
}

header {
  display: grid;
  grid-template-columns: auto auto;
  align-items: baseline;
  margin-bottom: 1em;
}

.employment-title {
  font-weight: normal;
}

.section {
  display: grid;
  gap: 1rem;
}

.section h3 {
  color: crimson;
  border-bottom: 1px solid #ddd;
}

#profile em {
  font-style: normal;
  font-weight: bold;
}

#skills h4 {
  margin-bottom: 0.5em;
}

#skills {
  display: grid;
  grid-auto-flow: column;
  gap: 1em;
}

ul {
  list-style-type: none;
  display: grid;
  gap: 0.25em;
}

#history {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: baseline;
  gap: 1em 2em;
}

#history div h4,
#history div h5 {
  margin-bottom: 0.5em;
}

#history div h5,
#history div p {
  font: inherit;
  font-size: 80%;
}

#history>ul:not(:nth-child(2)) {
  border-top: 1px solid #f0f0f0;
  padding-top: 1em;
}

</style>

    
<header>
  <div>
    <h1>Steven Degutis</h1>
    <h2 class="employment-title">Front-end Software Developer</h2>
  </div>
  <div style="text-align: right;">
    <p>
      <a href="mailto:sbdegutis@gmail.com">sbdegutis@gmail.com</a>
    </p>
    <p>
      <a href="tel:815-245-1625">815-245-1625</a>
    </p>
  </div>
</header>

<section id="profile" class="section">
  <h3>Profile</h3>
  <p>My speciality is <em>Web</em>, <em>UI</em>, <em>UX</em>, and I bring <em>10 years</em> of professional
    experience.</p>
  <p>The <em>variety</em> in my experience comes from my many <em>open source</em> contributions.</p>
</section>

<section class="section">
  <h3>Skills</h3>
  <div id="skills">
    <div>
      <h4>Web / Desktop</h4>
      <ul>
        <li>JavaScript, jQuery</li>
        <li>TypeScript, ESNext</li>
        <li>HTML5, JSX</li>
        <li>CSS3, SCSS, Less</li>
        <li>Node.js, Express.js</li>
        <li>React.js, Vue.js</li>
        <li>Vanilla JS (DOM)</li>
        <li>Electron</li>
      </ul>
    </div>
    <div>
      <h4>Cloud Services</h4>
      <ul>
        <li>Stripe, PayPal</li>
        <li>AWS Lambda, API Gateway</li>
        <li>AWS DynamoDB, RDS</li>
        <li>AWS S3, CloudFront</li>
        <li>AWS EC2, Route53, SES</li>
        <li>AWS CloudFormation, CDK</li>
      </ul>
    </div>
    <div>
      <h4>Soft skills</h4>
      <ul>
        <li>Communication</li>
        <li>Problem solving</li>
        <li>Avoiding rabbit holes</li>
        <li>Prioritizing tasks</li>
        <li>Taking initiative</li>
        <li>Pair-programming</li>
        <li>TDD & BDD</li>
      </ul>
    </div>
    <div>
      <h4>Secondary</h4>
      <ul>
        <li>C, Lua</li>
        <li>Ruby, Python</li>
        <li>Objective-C</li>
        <li>Swift, C#</li>
        <li>Java, Clojure</li>
        <li>Bash scripting</li>
        <li>Rust</li>
        <li>jQuery</li>
        <li>Making lists :)</li>
      </ul>
    </div>
  </div>
</section>

<section class="section">
  <h3>Work History</h3>
  <div id="history">
    <div>
      <h4>Self-employed</h4>
      <h5>Web Developer</h5>
      <p>2017&mdash;Present</p>
    </div>
    <ul>
      <li>Created modern React.js web app that uses many AWS services</li>
      <li>Integrated React and Webpack into a traditional server-side app</li>
      <li>Unified JavaScript and Markdown parsers into a new language</li>
      <li>Designed Socket-based IPC protocol for custom applications</li>
      <li>Created several Electron utility apps for personal use</li>
      <li>Created custom Electron app to replace complex spreadsheet</li>
      <li>Created static blog with Jekyll, CloudFront, S3, and Route53</li>
      <li>Created real-time apps using WebSockets, Node.js, and Vue.js</li>
      <li>Created <a href="https://sdegutis.github.io/">this resume (sdegutis.github.io)</a> as a single HTML page
      </li>
    </ul>
    <div>
      <h4>Clean Coders</h4>
      <h5>Web Developer</h5>
      <p>2012&mdash;2017</p>
    </div>
    <ul>
      <li>Migrated CleanCoders.com from Google App Engine to AWS</li>
      <li>Performed several data / schema / format migrations</li>
      <li>Implemented back-end in Clojure, Java, and Datomic</li>
      <li>Implemented front-end in HTML, CSS, Hiccup, and vanilla JS</li>
      <li>Automated database backups with Linux and AWS S3</li>
      <li>Integrated payment processing using PayPal and Stripe</li>
      <li>Created dashboard reports to inform business decisions</li>
    </ul>
    <div>
      <h4>8th Light</h4>
      <h5>Web Developer</h5>
      <p>2010&mdash;2012</p>
    </div>
    <ul>
      <li>Added back-end features to Sinatra and Rails web apps</li>
      <li>Added front-end features via JavaScript and jQuery</li>
      <li>Added features to company's Jekyll blog</li>
      <li>Added features to task management system using Backbone</li>
      <li>Created iOS app, integrated with REST API</li>
      <li>Learned TDD, BDD, and pair programming</li>
    </ul>
    <div>
      <h4>Big Nerd Ranch</h4>
      <h5>iOS Developer</h5>
      <p>2010</p>
    </div>
    <ul>
      <li>Established product requirements with clients</li>
      <li>Provided estimates for client projects</li>
      <li>Maintained and added features to iOS apps</li>
      <li>Created iPad app for initial iPad launch</li>
    </ul>
    <div>
      <h4>Self-employed</h4>
      <h5>Mac App Developer</h5>
      <p>2009&mdash;2010</p>
    </div>
    <ul>
      <li>Created Mac app "Docks" with cutting-edge UI/UX</li>
      <li>Docks featured as Staff Pick on Apple.com</li>
      <li>Docks named Gem of the Year with 4/5 by MacWorld</li>
      <li>Docks featured on Engadget magazine, praising its UI</li>
      <li>Created web store for Mac apps using PHP and MySQL</li>
    </ul>
  </div>
</section>
`;
