import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Cloud, File, X } from 'lucide-react'
import './FileUpload.css'

const FileUpload = ({ onFileUpload }) => {
  const [activeTab, setActiveTab] = useState('computer')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = (acceptedFiles) => {
    setSelectedFiles(prev => [...prev, ...acceptedFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.md', '.csv'],
      'application/pdf': ['.pdf'],
      'application/json': ['.json'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  })

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true)
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Call the parent component's upload handler
      onFileUpload(selectedFiles)
      
      // Clear selected files after successful upload
      setSelectedFiles([])
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleGoogleCloudSelect = () => {
    // This would integrate with Google Cloud Storage API
    // For now, we'll simulate file selection
    const mockFiles = [
      { name: 'document1.pdf', size: 1024 * 1024 * 2.5 },
      { name: 'data.csv', size: 1024 * 512 },
      { name: 'image.jpg', size: 1024 * 1024 * 1.8 }
    ]
    setSelectedFiles(prev => [...prev, ...mockFiles])
  }

  return (
    <div className="file-upload">
      <div className="upload-tabs">
        <button
          className={`tab ${activeTab === 'computer' ? 'active' : ''}`}
          onClick={() => setActiveTab('computer')}
        >
          <Upload size={20} />
          Upload from Computer
        </button>
        <button
          className={`tab ${activeTab === 'google-cloud' ? 'active' : ''}`}
          onClick={() => setActiveTab('google-cloud')}
        >
          <Cloud size={20} />
          Select from Google Cloud
        </button>
      </div>

      <div className="upload-content">
        {activeTab === 'computer' && (
          <div className="computer-upload">
            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive ? 'drag-active' : ''}`}
            >
              <input {...getInputProps()} />
              <Upload size={48} className="upload-icon" />
              <h3>Drag & drop files here, or click to select</h3>
              <p>Supports: PDF, TXT, CSV, JSON, Images</p>
            </div>
          </div>
        )}

        {activeTab === 'google-cloud' && (
          <div className="google-cloud-upload">
            <div className="cloud-storage-section">
              <Cloud size={48} className="cloud-icon" />
              <h3>Google Cloud Storage</h3>
              <p>Select files from your Google Cloud Storage bucket</p>
              <button 
                className="select-cloud-files-btn"
                onClick={handleGoogleCloudSelect}
              >
                Browse Cloud Storage
              </button>
            </div>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="selected-files">
            <h3>Selected Files ({selectedFiles.length})</h3>
            <div className="files-grid">
              {selectedFiles.map((file, index) => (
                <div key={index} className="file-card">
                  <File size={24} className="file-icon" />
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    className="remove-file-btn"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="upload-btn"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} File${selectedFiles.length > 1 ? 's' : ''}`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUpload 