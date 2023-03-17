import mdxToHtml from '@/lib/mdToHTML';
import '../styles/codeHighlight.css';
interface props {
    mdText: string;
}

const HTMLPreview: React.FC<props> = ({ mdText }: props) => {
    return (
        <div className='prose prose-invert prose-headings:my-4 prose-p:my-2 prose-hr:my-4 prose-a:text-blue-600'>
            {mdxToHtml.processSync(mdText).result}
        </div>
    );
};

export default HTMLPreview;
