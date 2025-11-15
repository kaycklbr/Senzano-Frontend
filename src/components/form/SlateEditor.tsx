import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

const TinyMCEEditor = ({ value, onChange, placeholder = "Digite aqui...", height = 300 }: TinyMCEEditorProps) => {
  return (
    <Editor
      value={value}
      apiKey='ppgnraua1tekovqa1k104hhyujavgogmtipybl2f10dqfu4m'
      onEditorChange={onChange}
      init={{
        height,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        placeholder
      }}
    />
  );
};

export default TinyMCEEditor;