const express = require("express");
const router = express.Router();
const Project = require("../models/ProjectSchema");
const JSZip = require("jszip");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

router.post("/deploy/:sessionId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.sessionId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Build ZIP
    const zip = new JSZip();
    project.files.forEach((file) => {
      zip.file(file.filename, file.code);
    });
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    // Prepare form-data
    const formData = new FormData();
    formData.append("file", zipBuffer, {
      filename: "site.zip",
      contentType: "application/zip",
    });

    
    const netlifyRes = await axios.post(
      "https://api.netlify.com/api/v1/sites",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.NETLIFY_TOKEN}`,
        },
      }
    );

    res.status(200).json({
      message: "Deployed successfully!",
      siteUrl: netlifyRes.data.url,
    });
  } catch (err) {
    console.error("Deploy error:", err?.response?.data || err.message);
    res.status(500).json({
      error: "Deployment failed",
      details: err?.response?.data || err.message,
    });
  }
});

module.exports = router;
