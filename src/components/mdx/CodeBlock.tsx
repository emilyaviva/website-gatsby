import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { monoBlue } from 'react-syntax-highlighter/dist/styles/hljs';
import * as languages from 'react-syntax-highlighter/dist/languages/hljs';

SyntaxHighlighter.registerLanguage('javascript', languages.javascript);
SyntaxHighlighter.registerLanguage('typescript', languages.typescript);
SyntaxHighlighter.registerLanguage('python', languages.python);
SyntaxHighlighter.registerLanguage('http', languages.http);
SyntaxHighlighter.registerLanguage('ruby', languages.ruby);
SyntaxHighlighter.registerLanguage('yaml', languages.yaml);
SyntaxHighlighter.registerLanguage('css', languages.css);
SyntaxHighlighter.registerLanguage('markdown', languages.markdown);
SyntaxHighlighter.registerLanguage('shell', languages.shell);
SyntaxHighlighter.registerLanguage('handlebars', languages.handlebars);

const CodeBlock = (props: any) => {
  const languageClassname = props.children.props.props.className;
  const language = languageClassname.substr('language-'.length);

  return (
    <SyntaxHighlighter language={language} style={monoBlue}>
      {props.children.props.children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
