import React,{useState} from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,


} from "@codesandbox/sandpack-react";
import { act } from 'react';
import { Code, FolderInput, GalleryThumbnails, Rocket } from 'lucide-react';
import Lookup from '../../Data/Lookup';

const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  return (
    <div>
      <div className="bg-[#181818] w-full p-2 border border-white/10 flex items-center justify-between ">
        <div className="flex bg-black p-2 w-fit rounded items-center gap-2 flex-wrap shrink-0">
          <h2
            onClick={() => {
              setActiveTab("code");
            }}
            className={`text-sm flex gap-1 items-center cursor-pointer py-1 px-2 rounded hover:bg-gray-800 ${
              activeTab === "code"
                ? "text-blue-600 bg-gray-800  bg-opacity-25"
                : "text-gray-300 bg-gray-900"
            }`}
          >
            Code
            <Code size={20} />
          </h2>

          <h2
            onClick={() => {
              setActiveTab("preview");
            }}
            className={`text-sm cursor-pointer flex gap-1 items-center py-1 px-2 rounded hover:bg-gray-800 ${
              activeTab === "preview"
                ? "text-blue-600 bg-gray-800  bg-opacity-25"
                : "text-gray-300 bg-gray-900"
            }`}
          >
            Preview
            <GalleryThumbnails size={20} />
          </h2>
        </div>
       
      </div>
      <SandpackProvider
        files={files}
        template="react" theme={"dark"} customSetup={{
        dependencies: {
          ...Lookup.DEPENDENCY,
        }
        }}
        options={
          {
            externalResources: ['https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4']
          }
        }
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <div className="flex flex-col ">
                <h1 className=" text-sm h-10 flex items-center px-2 text-gray-200 bg-[#181818] border-b border-white/10">
                  Files
                </h1>
                <SandpackFileExplorer style={{ height: "75vh" }} />
              </div>
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
              <SandpackPreview
                style={{ height: "80vh" }}
                showNavigator={true}
              />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeEditor