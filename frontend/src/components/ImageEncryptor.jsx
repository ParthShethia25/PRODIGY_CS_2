import React, { useState } from "react";
import axios from "axios";
import "./ImageEncryptor.css";

function ImageEncryptor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [operation, setOperation] = useState("encrypt");
  const [key, setKey] = useState(42);
  const [imageUrl, setImageUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setOriginalUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleProcess = async () => {
    if (!selectedFile) return alert("Please select an image file.");

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("operation", operation);
    formData.append("key", key);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/process", formData);
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      alert("Processing failed");
    }
    setLoading(false);
  };

  return (
    <div className="encryptor-container">
      <h1 className="title">🛡️ Image Encryptor Tool</h1>

      <div className="form-card">
        <input type="file" onChange={handleFileChange} />
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="encrypt">Encrypt</option>
          <option value="decrypt">Decrypt</option>
        </select>
        <input
          type="number"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter key"
        />
        <button onClick={handleProcess} disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>

      <div className="image-display">
        {originalUrl && (
          <div className="image-card">
            <h3>Original</h3>
            <img src={originalUrl} alt="Original" />
          </div>
        )}

        {imageUrl && (
          <div className="image-card">
            <h3>{operation === "encrypt" ? "Encrypted" : "Decrypted"}</h3>
            <img src={imageUrl} alt="Result" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageEncryptor;
