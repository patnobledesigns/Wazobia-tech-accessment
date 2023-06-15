import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "@ckeditor/ckeditor5-core";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useState } from "react";
import { uploadAdapter } from "../utils/UploadAdapter";

function uploadPlugin(editor: Editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };

  // editor.plugins.get("WordCount");
}

const TextEditor = () => {
  const [textEditorContent, setTextEditorContent] = useState<string>("");


  return (
    <div className="box grid place-content-center h-screen ">
      <div className="bg-[#FAFAFA] p-5 border mx-10">
        <h2 className="font-bold text-center leading-normal mb-5">
          Wazobia Technologies Assessment
        </h2>
        <CKEditor
          editor={ClassicEditor}
          data={textEditorContent}
        

          config={{
            
            extraPlugins: [uploadPlugin],

            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
                {
                  model: "heading4",
                  view: "h4",
                  title: "Heading 4",
                  class: "ck-heading_heading4",
                },
                {
                  model: "heading5",
                  view: "h5",
                  title: "Heading 5",
                  class: "ck-heading_heading5",
                },
                {
                  model: "heading6",
                  view: "h6",
                  title: "Heading 6",
                  class: "ck-heading_heading6",
                },
              ],
            },
          }}
          onChange={(_, editor) => {
            const data = editor.getData();
            if (
              textEditorContent.replace(/<\/?[^>]+(>|$)/gi, "").length === 1000
            ) {
              return;
            } else {
              setTextEditorContent(data);
            }
          }}
        />

        <div className="w-full pt-4">
          <p className="text-right">
            Characters:{" "}
            {textEditorContent.replace(/<\/?[^>]+(>|$)/gi, "").length === 1000
              ? "1000/1000 "
              : textEditorContent.replace(/<\/?[^>]+(>|$)/gi, "").length +
                "/1000"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
