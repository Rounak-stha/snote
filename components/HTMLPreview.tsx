import mdxToHtml from '@/lib/mdToHTML';
import '../styles/codeHighlight.css';
interface props {
    mdText: string;
}

const HTMLPreview: React.FC<props> = ({ mdText }: props) => {
    return <div className='prose prose-invert'>{mdxToHtml.processSync(mdText).result}</div>;
};

export default HTMLPreview;
