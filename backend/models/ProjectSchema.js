const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  code: { type: String, required: true },
});

const ProjectSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  response: { type: String, required: true },
  updates: [{
    operation: {
      type: String,
      required: true,
    },
    file: {
       type: String, required: true ,
  
    }
  }],
  projectTitle: { type: String, required: true },
  explanation: { type: String, required: true },
  files: [FileSchema], // Store generated files
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
