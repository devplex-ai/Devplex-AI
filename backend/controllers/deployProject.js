// controller/deployProject.js
const JSZip = require("jszip");
const Project = require("../models/Project");

const deployProject = async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  const zip = new JSZip();
  project.files.forEach((file) => {
    zip.file(file.filename, file.code);
  });

  const buffer = await zip.generateAsync({ type: "nodebuffer" });

  const netlifyURL = await deployToNetlify(buffer);

  res.json({ liveUrl: netlifyURL });
};
