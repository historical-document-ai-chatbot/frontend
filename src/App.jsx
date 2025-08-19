import { useState } from "react";
import FileUpload from "./components/FileUpload";
import "./App.css";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (files) => {
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Newspaper Chatbot</h1>
        <p>
          Upload files from your computer or select from Google Cloud Storage
        </p>
      </header>

      <main className="app-main">
        <FileUpload onFileUpload={handleFileUpload} />

        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <h2>Uploaded Files</h2>
            <div className="files-list">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
