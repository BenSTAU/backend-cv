import { Experience } from "./experienceModel.js";

export async function getExperience(req, res) {
  try {
    // Récupération de tous les documents de la collection Experience
    const experiences = await Experience.find();

    // Vérification si des experiences existent
    if (experiences.length === 0) {
      return res.status(404).json({ message: "No experiences found" });
    }

    // Envoi des experiences en réponse
    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createExperience(req, res) {
  try {
    const { date, location, title, explanation } = req.body;
    if ((!date, !location, !title, !explanation)) {
      return res.status(400).json({
        message:
          "Please provide all required fields: date, location, explanation and title.",
      });
    }

    const exist = await Experience.findOne({ title });
    if (exist) {
      return res.status(400).json({
        message:
          "This experience already exists. Please choose a different title.",
      });
    }
    const experience = new Experience({
      date,
      location,
      title,
      explanation,
    });
    await experience.save();
    res.status(201).json({
      message: "Experience created successfully",
      experience,
    });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateExperience(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const experienceUpdated = await Experience.findByIdAndUpdate(id, data);
    res.status(200).json({
      message: "Experience updated successfully",
      experienceUpdated,
    });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteExperience(req, res) {
  try {
    const { id } = req.params;
    const experienceDeleted = await Experience.findByIdAndDelete(id);
    res.status(200).json({
      message: "Experience deleted successfully",
      experienceDeleted,
    });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
